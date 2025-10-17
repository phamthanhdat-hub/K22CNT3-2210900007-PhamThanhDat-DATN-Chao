

--
CREATE  Table database    BabyCutieDB

USE BabyCutieDB;


CREATE TABLE nguoi_dung (
    ma_nguoi_dung INT PRIMARY KEY,
    ten_dang_nhap VARCHAR(100) NOT NULL UNIQUE,
    mat_khau VARCHAR(255) NOT NULL,
    ho_ten NVARCHAR(100),
    email VARCHAR(100),
    so_dien_thoai VARCHAR(20),
    vai_tro ENUM('admin', 'khach') DEFAULT 'khach',
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tài khoản quản trị mặc định
INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, ho_ten, email, vai_tro)
VALUES ('admin', '123456', N'Quản trị viên', 'admin@babycutie.vn', 'admin');


CREATE TABLE khach_hang (
    ma_khach INT INCREMENT PRIMARY KEY,
    ho_ten NVARCHAR(100) NOT NULL,
    so_dien_thoai VARCHAR(20),
    email VARCHAR(100),
    dia_chi NVARCHAR(255),
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE danh_muc (
    ma_danh_muc INT AUTO_INCREMENT PRIMARY KEY,
    ten_danh_muc NVARCHAR(100) NOT NULL,
    mo_ta NVARCHAR(255)
);

INSERT INTO danh_muc (ten_danh_muc) VALUES
(N'Cháo trẻ em'),
(N'Cháo người lớn'),
(N'Cháo dinh dưỡng'),
(N'Cháo ăn dặm'),
(N'Combo cháo'),
(N'Ngũ cốc / Sinh tố');


CREATE TABLE san_pham (
    ma_san_pham INT  PRIMARY KEY,
    ten_san_pham NVARCHAR(100) NOT NULL,
    mo_ta NVARCHAR(255),
    gia DECIMAL(10, 2) NOT NULL,
    hinh_anh VARCHAR(255),
    ma_danh_muc INT,
    FOREIGN KEY (ma_danh_muc) REFERENCES danh_muc(ma_danh_muc)
);

INSERT INTO san_pham (ten_san_pham, mo_ta, gia, hinh_anh, ma_danh_muc) VALUES
(N'Cháo cá hồi bí đỏ', N'Giàu DHA, tốt cho trí não bé', 35000, 'images/ca.jpg', 1),
(N'Cháo thịt bằm rau củ', N'Cung cấp năng lượng cho bé', 30000, 'images/thit.jpg', 1),
(N'Cháo gà ngô non', N'Hương vị nhẹ nhàng dễ ăn', 32000, 'images/ga.jpg', 1),
(N'Cháo bí xanh tôm nõn', N'Thơm ngon mát lành', 33000, 'images/tom.jpg', 1);

CREATE TABLE don_hang (
    ma_don INT  PRIMARY KEY,
    ma_khach INT,
    tong_tien DECIMAL(10,2),
    ngay_dat DATETIME DEFAULT CURRENT_TIMESTAMP,
    trang_thai ENUM('chờ xử lý', 'đang giao', 'hoàn tất') DEFAULT 'chờ xử lý',
    ghi_chu NVARCHAR(255),
    FOREIGN KEY (ma_khach) REFERENCES khach_hang(ma_khach)
);


CREATE TABLE chi_tiet_don_hang (
    ma_chi_tiet INT  PRIMARY KEY,
    ma_don INT,
    ma_san_pham INT,
    so_luong INT DEFAULT 1,
    don_gia DECIMAL(10,2),
    FOREIGN KEY (ma_don) REFERENCES don_hang(ma_don),
    FOREIGN KEY (ma_san_pham) REFERENCES san_pham(ma_san_pham)
);


CREATE TABLE lien_he (
    ma_lien_he INT  PRIMARY KEY,
    ho_ten NVARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    so_dien_thoai VARCHAR(20),
    noi_dung NVARCHAR(500),
    ngay_gui DATETIME DEFAULT CURRENT_TIMESTAMP
);
