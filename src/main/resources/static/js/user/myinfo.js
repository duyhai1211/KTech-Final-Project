// Lấy JWT từ localStorage
function getJwtToken() {
    return localStorage.getItem('jwtToken');  // Hoặc sessionStorage nếu lưu trong đó
}

// Hàm điều hướng về trang chủ
function navigateToHome() {
    const token = getJwtToken();  // Lấy token từ localStorage

    fetch('/api/checkHome', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,  // Thêm JWT vào header
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Nếu API trả về thành công, điều hướng về trang chủ
                window.location.href = '/';
            } else {
                // Xử lý khi có lỗi từ server
                alert('Có lỗi xảy ra, không thể điều hướng về trang chủ');
            }
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
            alert('Có lỗi xảy ra, không thể điều hướng về trang chủ');
        });
}

// Sự kiện click vào Home để điều hướng về trang chủ
document.querySelector('#home-link').addEventListener('click', function (event) {
    event.preventDefault();  // Ngăn chặn hành động mặc định của liên kết
    navigateToHome();  // Gọi hàm điều hướng
});

// Sự kiện click vào biểu tượng người dùng để điều hướng đến trang thông tin người dùng
document.querySelector('.user-profile .user-icon').addEventListener('click', function (event) {
    event.preventDefault();  // Ngăn chặn hành động mặc định của liên kết
    window.location.href = '/users/myinfo';  // Điều hướng đến trang thông tin người dùng
});

// Tìm kiếm nhà hàng khi nhấn nút Tìm kiếm
function searchRestaurants() {
    const token = getJwtToken();  // Lấy token từ localStorage
    const restaurantName = document.getElementById('restaurantName').value;
    const location = document.getElementById('location').value;

    fetch(`/api/searchRestaurants?name=${restaurantName}&location=${location}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,  // Thêm JWT vào header
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Cập nhật giao diện với danh sách nhà hàng từ API
                displayRestaurants(data.restaurants);
            } else {
                alert('Không tìm thấy nhà hàng nào.');
            }
        })
        .catch(error => {
            console.error('Lỗi khi tìm kiếm nhà hàng:', error);
            alert('Có lỗi xảy ra trong quá trình tìm kiếm.');
        });
}

// Hàm cập nhật giao diện với danh sách nhà hàng
function displayRestaurants(restaurants) {
    const restaurantList = document.querySelector('.restaurant-list');
    restaurantList.innerHTML = '';  // Xóa danh sách nhà hàng hiện tại

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.classList.add('restaurant-card');
        card.innerHTML = `
            <img src="${restaurant.image}" alt="Restaurant Image">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.cuisine} • Reviews: ${restaurant.reviews} ★★★★★</p>
            <p>${restaurant.location}</p>
            <p>${restaurant.phone}</p>
        `;
        restaurantList.appendChild(card);
    });
}

// Gán sự kiện click cho nút tìm kiếm
document.querySelector('button').addEventListener('click', searchRestaurants);

// Hàm thay đổi trang
function changePage(pageNumber) {
    const token = getJwtToken();  // Lấy token từ localStorage

    fetch(`/api/getRestaurants?page=${pageNumber}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,  // Thêm JWT vào header
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayRestaurants(data.restaurants);  // Hiển thị các nhà hàng của trang hiện tại
            } else {
                alert('Không thể tải danh sách nhà hàng.');
            }
        })
        .catch(error => {
            console.error('Lỗi khi thay đổi trang:', error);
            alert('Có lỗi xảy ra khi thay đổi trang.');
        });
}

// Sự kiện điều hướng qua các trang (pagination)
document.querySelector('.pagination').addEventListener('click', function(event) {
    const pageLink = event.target;
    if (pageLink.tagName === 'A') {
        const pageNumber = parseInt(pageLink.textContent, 10);
        changePage(pageNumber);  // Gọi hàm thay đổi trang
    }
});
