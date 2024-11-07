// Hàm chuyển sang trang "My Info"
function goToMyInfo() {
    window.location.href = '/user/myinfo';
}

// Hàm tìm kiếm nhà hàng
function searchRestaurants() {
    // Lấy giá trị từ ô nhập tên nhà hàng và vị trí
    const restaurantName = document.getElementById("restaurantName").value;
    const location = document.getElementById("location").value;

    // Hiển thị dữ liệu tìm kiếm trong console để kiểm tra
    console.log(`Searching for restaurant: ${restaurantName} at location: ${location}`);

    // Giả sử thực hiện tìm kiếm với API hoặc dữ liệu mẫu
    // Nếu cần, bạn có thể thêm logic gọi API tại đây để tìm kiếm
    alert(`Tìm kiếm nhà hàng: ${restaurantName} tại vị trí: ${location}`);
}

// Hàm hiển thị trang cụ thể
function showPage(pageNumber) {
    console.log(`Navigating to page: ${pageNumber}`);

    // Logic hiển thị trang với số trang cụ thể
    alert(`Hiển thị trang: ${pageNumber}`);

    // Đặt trạng thái của trang hiện tại
    const activePage = document.querySelector(".pagination .active");
    if (activePage) activePage.classList.remove("active");

    // Cập nhật trạng thái cho trang được chọn
    document.querySelector(`.pagination a:nth-child(${pageNumber + 1})`).classList.add("active");
}

// Hàm chuyển trang (điều hướng phân trang với nút << và >>)
function changePage(direction) {
    // Tìm trang hiện tại
    const currentPageElement = document.querySelector(".pagination .active");
    const currentPage = parseInt(currentPageElement.textContent);
    let newPage = currentPage + direction;

    // Kiểm tra giới hạn trang (ví dụ: 1-5)
    if (newPage < 1 || newPage > 5) return;

    // Hiển thị trang mới và cập nhật trạng thái
    showPage(newPage);
}
