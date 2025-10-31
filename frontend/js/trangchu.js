// Đợi cho toàn bộ tài liệu HTML được tải xong trước khi chạy script
document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================================
    // I. XỬ LÝ POPUP ĐĂNG NHẬP / ĐĂNG KÝ
    // =============================================================

    // 1. Khai báo các biến DOM cho Popup và các form
    const loginBtn = document.getElementById('loginBtn');
    const authPopup = document.getElementById('authPopup'); // Popup
    const closeBtn = document.querySelector('.auth-popup .close-btn');
    
    const loginFormDiv = document.getElementById('loginForm');
    const registerFormDiv = document.getElementById('registerForm');
    
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    
    const switchToRegisterLink = document.getElementById('switchToRegister');
    const switchToLoginLink = document.getElementById('switchToLogin');

    // --- CHỨC NĂNG CHUYỂN ĐỔI FORM ---
    function showLoginForm() {
        loginFormDiv.classList.add('active-form');
        registerFormDiv.classList.remove('active-form');
    }
    
    function showRegisterForm() {
        registerFormDiv.classList.add('active-form');
        loginFormDiv.classList.remove('active-form');
    }

    // Gán sự kiện chuyển đổi
    switchToRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterForm();
    });

    switchToLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginForm();
    });
    // --- KẾT THÚC CHỨC NĂNG CHUYỂN ĐỔI FORM ---


    // 2. Chức năng mở Popup
    loginBtn.onclick = function() {
        authPopup.style.display = "block";
        showLoginForm(); // Mở mặc định là form Đăng nhập
    }

    // 3. Chức năng đóng Popup khi click nút X
    closeBtn.onclick = function() {
        authPopup.style.display = "none";
    }

    // 4. Chức năng đóng Popup khi click ra ngoài Popup
    window.onclick = function(event) {
        if (event.target == authPopup) {
            authPopup.style.display = "none";
        }
    }

    // 5. Xử lý Form Đăng nhập
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const username = document.getElementById('login-username').value;
        alert(`Đang tiến hành ĐĂNG NHẬP cho: ${username}`);
        authPopup.style.display = "none";
        loginForm.reset(); 
    });
    
    // 6. Xử lý Form Đăng ký
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        
        alert(`Đăng ký thành công! Chào mừng ${name} (${email}) đến với Baby Cutie!`);
        authPopup.style.display = "none";
        registerForm.reset();
    });
    
    // =============================================================
    // II. XỬ LÝ CÁC NÚT TƯƠNG TÁC CHÍNH (NEW)
    // =============================================================

    // 7. Xử lý nút "Liên hệ ngay" trên Banner
    const mainBtn = document.querySelector('.btn-main');

    if (mainBtn) {
        mainBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Sử dụng smooth scroll tới Footer hoặc một Contact Section
            const footerSection = document.querySelector('.footer');
            if (footerSection) {
                footerSection.scrollIntoView({ behavior: 'smooth' });
                // Thông báo nhẹ
                console.log('Chuyển tới phần Liên hệ/Footer.');
            } else {
                alert('Vui lòng liên hệ hotline: 1900-1234');
            }
        });
    }


    // 8. Xử lý các nút "Mua hàng"
    // Lấy tất cả các nút có class .btn-buy
    const buyBtns = document.querySelectorAll('.btn-buy');

    buyBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Lấy thông tin sản phẩm (Giả định nằm trong thẻ cha .product-item)
            const productItem = button.closest('.product-item');
            if (productItem) {
                const productName = productItem.querySelector('h3').textContent;
                const productPrice = productItem.querySelector('.price').textContent;
                
                // Hiển thị thông báo thêm vào giỏ hàng
                alert(`🛒 Đã thêm "${productName}" với giá ${productPrice} vào giỏ hàng!`);
                console.log(`Sản phẩm đã mua: ${productName}, Giá: ${productPrice}`);
                
                // (Trong thực tế sẽ có thêm logic cập nhật số lượng giỏ hàng)
            }
        });
    });

});