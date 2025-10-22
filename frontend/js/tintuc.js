const newsData = {
  1: {
    title: "Lợi ích của cháo dinh dưỡng tự nhiên cho trẻ nhỏ",
    content: "Cháo tự nhiên được nấu từ các nguyên liệu sạch, không chứa phụ gia giúp bé hấp thu dinh dưỡng tốt hơn, đồng thời tăng cường sức đề kháng. Việc lựa chọn nguồn thực phẩm tươi giúp đảm bảo an toàn cho bé yêu mỗi ngày."
  },
  2: {
    title: "Bí quyết nấu cháo cho bé ăn dặm vừa ngon vừa bổ",
    content: "Để nấu cháo ăn dặm ngon, mẹ nên chọn gạo thơm, kết hợp với thịt, cá, rau củ cân đối. Giữ nguyên vị ngọt tự nhiên của thực phẩm sẽ giúp bé ăn ngon hơn và hấp thu dưỡng chất hiệu quả."
  },
  3: {
    title: "5 loại thực phẩm vàng giúp bé phát triển trí não",
    content: "Cá hồi, trứng, yến mạch, quả bơ và sữa chua là những thực phẩm giàu DHA và Omega-3 giúp tăng cường trí nhớ, phát triển trí não toàn diện cho trẻ."
  }
};

document.querySelectorAll('.btn-readmore').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-id');
    const popup = document.getElementById('newsPopup');
    const popupText = document.getElementById('popupText');
    
    popupText.innerHTML = `
      <h2>${newsData[id].title}</h2>
      <p>${newsData[id].content}</p>
    `;
    popup.style.display = 'flex';
  });
});

document.querySelector('.close-btn').addEventListener('click', () => {
  document.getElementById('newsPopup').style.display = 'none';
});

window.addEventListener('click', (e) => {
  const popup = document.getElementById('newsPopup');
  if (e.target === popup) popup.style.display = 'none';
});
