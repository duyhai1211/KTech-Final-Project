// URL API endpoint
const url = "/views/users/signup-owner";

// Lắng nghe sự kiện submit của form
document.querySelector('.signup-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Ngăn chặn form reload lại trang

    // Lấy giá trị từ các trường trong form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordCheck = document.getElementById('password-check').value;

    // Kiểm tra tính hợp lệ (nếu có)
    if (password !== passwordCheck) {
        alert("Password và Password Check không khớp!");
        return;
    }

    // Cấu hình request với fetch API
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, passwordCheck })
        });

        // Kiểm tra trạng thái của response
        if (response.ok) {
            const data = await response.json();

            // Xử lý JWT token (nếu backend trả về)
            if (data.token) {
                localStorage.setItem("token", data.token); // Lưu token vào localStorage
            }

            // Chuyển hướng đến trang đăng nhập
            window.location.href = "/views/users/login";
        } else {
            // Xử lý lỗi từ server (nếu có)
            const errorData = await response.json();
            alert(`Lỗi: ${errorData.message || "Đăng ký thất bại"}`);
        }
    } catch (error) {
        console.error("Đã xảy ra lỗi:", error);
        alert("Đã xảy ra lỗi trong quá trình đăng ký.");
    }
});
