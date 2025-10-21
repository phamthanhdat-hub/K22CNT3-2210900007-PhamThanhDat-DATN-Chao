import os
from flask import Flask, jsonify, request, send_from_directory, abort
from flask_migrate import Migrate
from flask_mail import Mail, Message
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

from config import Config
from models import db, User, Product, Order, OrderItem, ContactMessage
from schemas import ProductSchema, ContactSchema, OrderSchema

def create_app():
    app = Flask(__name__, static_folder="static", static_url_path="/")
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)
    migrate = Migrate(app, db)
    mail = Mail(app)

    product_schema = ProductSchema()
    products_schema = ProductSchema(many=True)
    contact_schema = ContactSchema()
    order_schema = OrderSchema()

    @app.route("/")
    def index():
        # Serve trang chủ tĩnh (copy file trangchu.html vào static/)
        return app.send_static_file("trangchu.html")

    # Serve other static pages (ví dụ /thucdon, /lienhe)
    @app.route("/<path:page>")
    def static_pages(page):
        if os.path.exists(os.path.join(app.static_folder, page)):
            return app.send_static_file(page)
        # allow urls like 'thucdon.html' or 'thucdon'
        if not page.endswith(".html") and os.path.exists(os.path.join(app.static_folder, f"{page}.html")):
            return app.send_static_file(f"{page}.html")
        abort(404)

    # ---- API: products ----
    @app.route("/api/products", methods=["GET"])
    def api_get_products():
        q = request.args.get("q")
        category = request.args.get("category")
        query = Product.query
        if q:
            query = query.filter(Product.name.ilike(f"%{q}%"))
        if category:
            query = query.filter_by(category=category)
        prods = query.order_by(Product.created_at.desc()).all()
        return jsonify(products_schema.dump(prods)), 200

    @app.route("/api/products/<int:product_id>", methods=["GET"])
    def api_get_product(product_id):
        p = Product.query.get_or_404(product_id)
        return jsonify(product_schema.dump(p)), 200

    # ---- API: contact ----
    @app.route("/api/contact", methods=["POST"])
    def api_contact():
        json_data = request.get_json() or request.form
        errors = contact_schema.validate(json_data)
        if errors:
            return jsonify({"errors": errors}), 400
        data = contact_schema.load(json_data)
        msg = ContactMessage(
            name=data["name"],
            email=data["email"],
            phone=data.get("phone"),
            message=data["message"]
        )
        db.session.add(msg)
        db.session.commit()

        # gửi email thông báo (nếu cấu hình MAIL)
        try:
            if app.config.get("MAIL_USERNAME"):
                m = Message(
                    subject=f"Liên hệ mới từ {msg.name}",
                    recipients=[app.config.get("MAIL_DEFAULT_SENDER")],
                    body=f"Email: {msg.email}\nSĐT: {msg.phone}\n\nNội dung:\n{msg.message}"
                )
                mail.send(m)
        except Exception as e:
            app.logger.warning("Mail send failed: %s", e)

        return jsonify({"message": "Gửi liên hệ thành công"}), 201

    # ---- API: order ----
    @app.route("/api/orders", methods=["POST"])
    def api_create_order():
        json_data = request.get_json()
        errors = order_schema.validate(json_data)
        if errors:
            return jsonify({"errors": errors}), 400
        data = order_schema.load(json_data)

        items = data["items"]
        total = 0
        order_items = []
        for it in items:
            prod = Product.query.get(it["product_id"])
            if not prod:
                return jsonify({"error": f"Product id {it['product_id']} not found"}), 404
            unit_price = prod.price
            q = it["quantity"]
            total += unit_price * q
            order_items.append({
                "product": prod,
                "quantity": q,
                "unit_price": unit_price
            })

        new_order = Order(
            customer_name=data["customer_name"],
            customer_phone=data["customer_phone"],
            customer_email=data.get("customer_email"),
            address=data["address"],
            total_amount=total,
            status="pending"
        )
        db.session.add(new_order)
        db.session.flush()  # để có id order

        for oi in order_items:
            item = OrderItem(
                order_id=new_order.id,
                product_id=oi["product"].id,
                product_name=oi["product"].name,
                quantity=oi["quantity"],
                unit_price=oi["unit_price"]
            )
            db.session.add(item)

        db.session.commit()

        # (tùy chọn) gửi email xác nhận
        try:
            if app.config.get("MAIL_USERNAME") and new_order.customer_email:
                m = Message(
                    subject=f"Xác nhận đơn hàng #{new_order.id}",
                    recipients=[new_order.customer_email],
                    body=f"Cảm ơn {new_order.customer_name}, đơn hàng của bạn đã được nhận. Tổng: {new_order.total_amount} VND"
                )
                mail.send(m)
        except Exception as e:
            app.logger.warning("Mail send failed: %s", e)

        return jsonify({"message": "Đặt hàng thành công", "order_id": new_order.id}), 201

    # ---- API: simple auth (demo) ----
    @app.route("/api/auth/register", methods=["POST"])
    def api_register():
        body = request.get_json()
        username = body.get("username")
        password = body.get("password")
        if not username or not password:
            return jsonify({"error": "username and password required"}), 400
        if User.query.filter_by(username=username).first():
            return jsonify({"error": "username exists"}), 400
        user = User(
            username=username,
            password_hash=generate_password_hash(password),
            full_name=body.get("full_name"),
            email=body.get("email"),
            phone=body.get("phone")
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "registered"}), 201

    @app.route("/api/auth/login", methods=["POST"])
    def api_login():
        body = request.get_json()
        username = body.get("username")
        password = body.get("password")
        user = User.query.filter_by(username=username).first()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"error": "invalid credentials"}), 401
        # demo: trả về user id và username (trong prod dùng JWT)
        return jsonify({"message": "ok", "user": {"id": user.id, "username": user.username}}), 200

    # ---- Admin helper: list orders (protected simple) ----
    @app.route("/api/admin/orders", methods=["GET"])
    def api_admin_orders():
        # demo: không auth (bạn có thể thêm token/JWT)
        orders = Order.query.order_by(Order.created_at.desc()).all()
        result = []
        for o in orders:
            items = [{"product_name": it.product_name, "quantity": it.quantity, "unit_price": it.unit_price} for it in o.items]
            result.append({
                "id": o.id,
                "customer_name": o.customer_name,
                "phone": o.customer_phone,
                "total": o.total_amount,
                "status": o.status,
                "created_at": o.created_at.isoformat(),
                "items": items
            })
        return jsonify(result), 200

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
