let allRestaurants = []; // Biến để lưu trữ danh sách tất cả nhà hàng

// Hàm chuyển sang trang "My Info"
function goToMyInfo() {
    window.location.href = '/views/user/myinfo';
}

// Hàm lấy tất cả nhà hàng khi tải trang lần đầu
function loadAllRestaurants() {
    fetch('/restaurants/all')
        .then(response => response.json())
        .then(data => {
            allRestaurants = data.content; // Lưu tất cả nhà hàng vào biến
            displayRestaurants(allRestaurants); // Hiển thị toàn bộ nhà hàng
        })
        .catch(error => console.error('Lỗi khi tải tất cả nhà hàng:', error));
}

// Hàm hiển thị danh sách nhà hàng động
function displayRestaurants(restaurants) {
    const restaurantList = document.querySelector('.restaurant-list');
    restaurantList.innerHTML = ''; // Xóa danh sách nhà hàng hiện tại

    // Tạo và hiển thị các thẻ nhà hàng mới từ dữ liệu API
    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.classList.add('restaurant-card');
        card.innerHTML = `
            <img src="${restaurant.image || 'default.jpg'}" alt="Restaurant Image">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.cuisine} • Reviews: ${restaurant.reviews} ★★★★★</p>
            <p>${restaurant.location}</p>
            <p>${restaurant.phone}</p>
        `;
        restaurantList.appendChild(card);
    });
}

// Hàm tìm kiếm nhà hàng dựa trên từ khóa và vị trí
function searchRestaurants() {
    const restaurantName = document.getElementById("restaurantName").value.toLowerCase();
    const location = document.getElementById("location").value.toLowerCase();

    // Lọc danh sách nhà hàng dựa trên từ khóa
    const filteredRestaurants = allRestaurants.filter(restaurant => {
        const nameMatch = restaurant.name.toLowerCase().includes(restaurantName);
        const locationMatch = restaurant.location.toLowerCase().includes(location);
        return nameMatch && locationMatch;
    });

    displayRestaurants(filteredRestaurants); // Hiển thị danh sách nhà hàng đã lọc
}

// Hàm hiển thị trang cụ thể khi chọn số trang
function showPage(pageNumber) {
    console.log(`Navigating to page: ${pageNumber}`);
    // Gọi API phân trang nếu cần thiết
    fetch(`/api/getRestaurants?page=${pageNumber}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayRestaurants(data.restaurants); // Hiển thị các nhà hàng của trang hiện tại
            } else {
                alert('Không thể tải danh sách nhà hàng.');
            }
        })
        .catch(error => {
            console.error('Lỗi khi thay đổi trang:', error);
            alert('Có lỗi xảy ra khi thay đổi trang.');
        });

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

// Gọi hàm loadAllRestaurants khi trang tải
document.addEventListener('DOMContentLoaded', loadAllRestaurants);
