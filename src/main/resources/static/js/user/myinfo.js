// Hàm để lấy JWT token từ localStorage
function getJwtToken() {
    return localStorage.getItem('token'); // Hoặc sessionStorage nếu lưu trong đó
}

// Hàm để lấy thông tin người dùng từ API và hiển thị lên trang
async function loadUserInfo() {
    const token = getJwtToken(); // Lấy token từ localStorage
    try {
        const response = await fetch('/users/get-user-info', {
            headers: {
                'Authorization': `Bearer ${token}`, // Thêm JWT vào header
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            setUserInfo(data); // Gọi hàm để thiết lập thông tin người dùng
        } else {
            console.error('Không thể tải thông tin người dùng');
            alert('Bạn cần đăng nhập để truy cập thông tin này.');
            window.location.href = '/users/login'; // Chuyển hướng đến trang đăng nhập nếu không có quyền
        }
    } catch (error) {
        console.error('Lỗi khi tải thông tin người dùng:', error);
    }
}

// Hàm để thiết lập thông tin người dùng trên trang
function setUserInfo(data) {
    document.getElementById('user-nickname').textContent = data.nickname || '[Nickname]';
    document.getElementById('user-email').textContent = data.email || 'user@example.com';
    document.getElementById('user-phone').textContent = data.phone || '010-1234-5678';
    // document.getElementById('user-avatar').src = data.avatar || '';

    // Cập nhật hình đại diện
    const userAvatar = document.getElementById('user-avatar');
    if (data.avatar) {
        userAvatar.src = data.avatar; // Nếu có URL hình ảnh, cập nhật src
        userAvatar.alt = `${data.nickname}'s avatar`; // Cập nhật alt cho hình ảnh
    } else {
        userAvatar.src = 'https://via.placeholder.com/50'; // Hình ảnh mặc định nếu không có
        userAvatar.alt = 'Default avatar'; // Cập nhật alt cho hình ảnh mặc định
    }
}

// Hàm điều hướng đến trang cập nhật thông tin người dùng
function redirectToUserUpdatePage() {
    console.log("Chuyển hướng đến /users/update");
    window.location.href = "/views/users/update"; // Điều hướng đến trang cập nhật thông tin
}

// Gán sự kiện click cho nút "정보 수정"
document.addEventListener('DOMContentLoaded', function() {
    const updateButton = document.querySelector('.action-btn'); // Tìm nút với lớp 'action-btn'
    if (updateButton) {
        updateButton.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của <a>
            redirectToUserUpdatePage(); // Gọi hàm để chuyển hướng
        });
    } else {
        console.error("Không tìm thấy nút với lớp 'action-btn'");
    }
});

// Hàm để tải danh sách đặt chỗ của người dùng từ API
async function loadUserReservations(page = 0, size = 10) {
    const token = getJwtToken(); // Lấy token từ localStorage
    try {
        const response = await fetch(`/reservation/user?page=${page}&size=${size}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Thêm JWT vào header
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayReservations(data.content); // Hiển thị danh sách đặt chỗ
            setupPagination(data.totalPages, page); // Thiết lập phân trang
        } else {
            console.error('Không thể tải danh sách đặt chỗ');
            alert('Có lỗi xảy ra khi tải danh sách đặt chỗ.');
        }
    } catch (error) {
        console.error('Lỗi khi tải danh sách đặt chỗ:', error);
    }
}

// Hàm hiển thị danh sách đặt chỗ
function displayReservations(reservations) {
    const reservationList = document.getElementById('reservation-list');
    reservationList.innerHTML = ''; // Xóa danh sách cũ

    reservations.forEach(reservation => {
        const item = document.createElement('div');
        item.classList.add('reservation-item');
        item.innerHTML = `
            <span>${reservation.name}</span>
            <span>${reservation.date} ${reservation.time}</span>
            <span class="status">${reservation.status}</span>
        `;
        reservationList.appendChild(item);
    });
}

// Hàm thiết lập phân trang
function setupPagination(totalPages, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Xóa phân trang cũ

    for (let i = 0; i < totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i + 1;
        pageButton.classList.add('page-btn');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => loadUserReservations(i)); // Gọi hàm tải danh sách đặt chỗ
        pagination.appendChild(pageButton);
    }
}

// Gọi hàm loadUserInfo và loadUserReservations khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    loadUserInfo(); // Tải thông tin người dùng
    loadUserReservations(); // Tải danh sách đặt chỗ
});




