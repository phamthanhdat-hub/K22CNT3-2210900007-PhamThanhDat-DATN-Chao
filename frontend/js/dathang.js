// Xử lý popup đăng nhập
const loginBtn = document.getElementById('loginBtn');
const popup = document.getElementById('loginPopup');
const closePopup = document.querySelector('.close');

// Kiểm tra nếu loginBtn tồn tại
if (loginBtn) {
    loginBtn.addEventListener('click', () => popup.style.display = 'flex');
}

if (closePopup) {
    closePopup.addEventListener('click', () => popup.style.display = 'none');
}

window.addEventListener('click', (e) => {
    if (e.target === popup) popup.style.display = 'none';
});
