// URL API endpoint
const url = "/users/signin";

// Lắng nghe sự kiện submit của form
document.querySelector('.signin-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Ngăn chặn form reload lại trang

    // Lấy giá trị từ các trường trong form
    const username = document.getElementById('text').value;
    const password = document.getElementById('password').value;

    // Cấu hình request với fetch API
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        // Kiểm tra trạng thái của response
        if (response.ok) {
            const data = await response.json();

            // Xử lý JWT token (nếu backend trả về)
            if (data.token) {
                localStorage.setItem("token", data.token); // Lưu token vào localStorage
            }

            // Chuyển hướng đến trang chính (main)
            window.location.href = "/views/users";
        } else {
            // Xử lý lỗi từ server (nếu có)
            const errorData = await response.json();
            alert(`Lỗi: ${errorData.message || "Đăng nhập thất bại"}`);
        }
    } catch (error) {
        console.error("Đã xảy ra lỗi:", error);
        alert("Đã xảy ra lỗi trong quá trình đăng nhập.");
    }
});

// Hàm để thực hiện request có đính kèm JWT trong headers
async function fetchWithAuth(url, options = {}) {
    // Lấy JWT token từ localStorage
    const token = localStorage.getItem("token");

    // Thêm Authorization header nếu có token
    if (token) {
        options.headers = {
            ...options.headers,
            "Authorization": `Bearer ${token}`
        };
    }

    return fetch(url, options);
}


