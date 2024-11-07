// logout.js

// Hàm để xử lý đăng xuất
function logout() {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    // Gửi yêu cầu đăng xuất đến server
    fetch('/views/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // Gửi token trong header nếu cần
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Nếu đăng xuất thành công, xóa token khỏi localStorage
                localStorage.removeItem("token");
                // Chuyển hướng đến trang đăng nhập hoặc trang chính
                window.location.href = '/views/users/login'; // Hoặc trang nào bạn muốn
            } else {
                console.error("Error logging out:", response.statusText);
                alert("Đã có lỗi xảy ra khi đăng xuất.");
            }
        })
        .catch(error => {
            console.error("Logout error:", error);
            alert("Đã có lỗi xảy ra khi đăng xuất.");
        });
}

