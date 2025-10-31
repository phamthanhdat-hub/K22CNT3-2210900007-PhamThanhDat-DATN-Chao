document.addEventListener('DOMContentLoaded', function() {
    // 1. Lấy các phần tử cần thao tác
    const aboutImagesContainer = document.querySelector('.about-images');
    const smallImages = aboutImagesContainer ? aboutImagesContainer.querySelectorAll('.small-img') : [];
    const btnView = document.querySelector('.btn-view');

    // Số lượng ảnh hiển thị mặc định (ví dụ: 2 ảnh đầu tiên)
    const defaultVisibleCount = 2;

    // Kiểm tra nếu không có đủ ảnh hoặc không có nút "Xem thêm" thì thoát
    if (smallImages.length <= defaultVisibleCount || !btnView) {
        if (btnView) {
            btnView.style.display = 'none'; // Ẩn nút nếu không cần thiết
        }
        return;
    }

    // 2. Thiết lập trạng thái ẩn ban đầu
    // Bắt đầu từ ảnh thứ 3 (index 2)
    function hideExtraImages() {
        for (let i = defaultVisibleCount; i < smallImages.length; i++) {
            smallImages[i].style.display = 'none';
        }
        btnView.textContent = 'Xem thêm';
        btnView.classList.remove('active-show');
    }

    // 3. Thiết lập trạng thái hiện
    function showExtraImages() {
        for (let i = defaultVisibleCount; i < smallImages.length; i++) {
            // Hiển thị ảnh (dùng 'inline-block' hoặc 'block' tùy theo cách bạn muốn CSS)
            smallImages[i].style.display = 'block'; 
        }
        btnView.textContent = 'Thu gọn';
        btnView.classList.add('active-show');
    }

    // Thiết lập trạng thái ban đầu
    hideExtraImages();

    // 4. Xử lý sự kiện khi nhấp vào nút
    btnView.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a> (tải lại trang)

        // Kiểm tra xem nút đang ở trạng thái "Xem thêm" hay "Thu gọn"
        const isShowing = btnView.classList.contains('active-show');

        if (isShowing) {
            // Nếu đang hiển thị (Thu gọn), thì ẩn bớt
            hideExtraImages();
        } else {
            // Nếu đang ẩn (Xem thêm), thì hiện ra
            showExtraImages();
        }
    });

    // Cần thêm CSS để đảm bảo ảnh nhỏ (small-img) hiển thị đúng kiểu khi được hiện
    // Nếu bạn muốn chúng hiển thị kiểu inline-flex, hãy sửa ở đây:
    // smallImages[i].style.display = 'inline-block'; // Hoặc 'flex' nếu cần
});