// Hiệu ứng header khi cuộn
window.addEventListener('scroll', () => {
  const header = document.getElementById('mainHeader');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Xử lý form liên hệ
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Lấy dữ liệu từ form
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  // Kiểm tra cơ bản
  if (!name || !email || !phone || !message) {
    formStatus.textContent = "Vui lòng điền đầy đủ thông tin!";
    formStatus.style.color = "red";
    return;
  }

  // Hiển thị trạng thái gửi (giả lập)
  formStatus.textContent = "Đang gửi thông tin...";
  formStatus.style.color = "#e04ae0";

  // Giả lập gửi dữ liệu
  setTimeout(() => {
    formStatus.textContent = "Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.";
    formStatus.style.color = "green";
    contactForm.reset();
  }, 1500);
});
