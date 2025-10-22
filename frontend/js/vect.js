// Hiệu ứng cuộn mượt khi click vào menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  });
});

// Hiệu ứng xuất hiện khi cuộn tới các phần tử
window.addEventListener('scroll', () => {
  document.querySelectorAll('.choose-item').forEach(item => {
    const position = item.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
    if (position < screenHeight - 100) {
      item.classList.add('visible');
    }
  });
});

// Hiệu ứng cho nút “Xem thêm”
document.querySelector('.btn-view')?.addEventListener('mouseenter', e => {
  e.target.classList.add('hovering');
});
document.querySelector('.btn-view')?.addEventListener('mouseleave', e => {
  e.target.classList.remove('hovering');
});
