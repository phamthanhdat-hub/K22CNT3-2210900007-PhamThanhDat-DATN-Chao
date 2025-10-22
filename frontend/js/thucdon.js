// Cuộn mượt khi nhấn menu
document.querySelectorAll('.navigation a').forEach(link => {
  link.addEventListener('click', e => {
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const section = document.querySelector(link.getAttribute('href'));
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Hiệu ứng hover cho các nút Mua
const buttons = document.querySelectorAll('.btn-order');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.1)';
    btn.style.boxShadow = '0 4px 10px rgba(224,74,224,0.3)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = 'none';
  });
});

// Tải động danh sách menu (ví dụ đơn giản)
const menuContainer = document.getElementById('menu-container');
const menus = [
  { title: "Cháo Trẻ Em", icon: "fa-baby", color: "#ff99cc" },
  { title: "Cháo Người Lớn", icon: "fa-user", color: "#ffb6b9" },
  { title: "Cháo Ăn Dặm", icon: "fa-seedling", color: "#ffccff" },
  { title: "Cháo Dinh Dưỡng", icon: "fa-bowl-food", color: "#ffc0cb" }
];

menus.forEach(m => {
  const section = document.createElement('section');
  section.className = 'menu-section';
  section.innerHTML = `
    <h2 style="color:${m.color}"><i class="fa-solid ${m.icon}"></i> ${m.title}</h2>
    <div class="menu-list">
        <p class="demo-text">✨ Nội dung cháo ${m.title.toLowerCase()} đang được tải... ✨</p>
    </div>`;
  menuContainer.appendChild(section);
});
