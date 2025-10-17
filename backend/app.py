from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import config

app = Flask(__name__)
app.config.from_object(config)
mysql = MySQL(app)
CORS(app)


#  ĐĂNG NHẬP

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('ten_dang_nhap')
    password = data.get('mat_khau')

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM nguoi_dung WHERE ten_dang_nhap=%s", [username])
    user = cur.fetchone()

    if user and user['mat_khau'] == password:
        return jsonify({"success": True, "message": "Đăng nhập thành công!", "user": user})
    else:
        return jsonify({"success": False, "message": "Sai tài khoản hoặc mật khẩu!"})



#  LẤY DANH SÁCH SẢN PHẨM

@app.route('/api/sanpham', methods=['GET'])
def get_products():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM san_pham")
    result = cur.fetchall()
    return jsonify(result)



#  TẠO ĐƠN HÀNG

@app.route('/api/donhang', methods=['POST'])
def create_order():
    data = request.get_json()
    ma_khach = data.get('ma_khach')
    tong_tien = data.get('tong_tien')
    ghi_chu = data.get('ghi_chu', '')

    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO don_hang (ma_khach, tong_tien, ghi_chu) VALUES (%s, %s, %s)",
        (ma_khach, tong_tien, ghi_chu)
    )
    mysql.connection.commit()
    return jsonify({"success": True, "message": "Tạo đơn hàng thành công!"})



#  GỬI LIÊN HỆ

@app.route('/api/lienhe', methods=['POST'])
def send_contact():
    data = request.get_json()
    ho_ten = data.get('ho_ten')
    email = data.get('email')
    so_dien_thoai = data.get('so_dien_thoai')
    noi_dung = data.get('noi_dung')

    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO lien_he (ho_ten, email, so_dien_thoai, noi_dung) VALUES (%s, %s, %s, %s)",
        (ho_ten, email, so_dien_thoai, noi_dung)
    )
    mysql.connection.commit()
    return jsonify({"success": True, "message": "Gửi liên hệ thành công!"})



#  CHẠY SERVER

if __name__ == '__main__':
    app.run(debug=True, port=5000)
