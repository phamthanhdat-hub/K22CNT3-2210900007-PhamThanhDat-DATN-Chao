from app import create_app
from models import db, Product, User
import os

app = create_app()

with app.app_context():
    db.create_all()

    # nếu chưa có product, thêm mẫu
    if Product.query.count() == 0:
        sample = [
            {"name": "Cháo Gà Rau Củ", "price": 25000, "description": "Bổ sung vitamin, giúp bé khỏe mạnh.", "image": "images/ga.jpg", "category": "cháo trẻ em"},
            {"name": "Cháo Cá Hồi", "price": 35000, "description": "Omega-3 phát triển trí não cho bé.", "image": "images/ca.jpg", "category": "cháo trẻ em"},
            {"name": "Cháo Thịt Bò", "price": 30000, "description": "Giàu sắt và đạm.", "image": "images/bo.jpg", "category": "cháo người lớn"},
            {"name": "Cháo Lươn", "price": 33000, "description": "Bổ máu, phục hồi sức khỏe.", "image": "images/luon.jpg", "category": "cháo người lớn"},
        ]
        for p in sample:
            prod = Product(name=p["name"], price=p["price"], description=p["description"], image=p["image"], category=p["category"])
            db.session.add(prod)
        db.session.commit()
        print("Seeded products.")

    # tạo user admin demo
    if User.query.count() == 0:
        from werkzeug.security import generate_password_hash
        admin = User(username="admin", password_hash=generate_password_hash("admin123"), full_name="Admin")
        db.session.add(admin)
        db.session.commit()
        print("Created admin user.")
