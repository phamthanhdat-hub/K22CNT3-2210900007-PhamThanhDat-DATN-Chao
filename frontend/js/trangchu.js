// ===== POPUP ĐĂNG NHẬP =====
const loginBtn = document.getElementById("loginBtn");
const loginPopup = document.getElementById("loginPopup");
const closePopup = document.querySelector(".close");

loginBtn.addEventListener("click", () => {
  loginPopup.style.display = "flex";
  document.body.style.overflow = "hidden";
});

closePopup.addEventListener("click", () => {
  loginPopup.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
  if (e.target === loginPopup) {
    loginPopup.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// ===== XỬ LÝ SUBMIT ĐĂNG NHẬP =====
document.querySelector(".login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Đăng nhập thành công 🎉", "success");
  loginPopup.style.display = "none";
  document.body.style.overflow = "auto";
});

// ===== NÚT MUA NGAY =====
const buyButtons = document.querySelectorAll(".btn-buy");
buyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productName = btn.parentElement.querySelector("h3").innerText;
    showToast(`Đã thêm "${productName}" vào giỏ hàng 🛒`, "info");
  });
});

// ===== HÀM HIỂN THỊ THÔNG BÁO =====
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-cart-shopping'}"></i> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 50);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}
