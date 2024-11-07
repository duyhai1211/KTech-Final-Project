// Kiểm tra JWT token
const jwt = localStorage.getItem("token");
if (!jwt) {
    location.href = "/views/users/login"; // Chuyển hướng đến trang đăng nhập nếu không có token
}

// Lấy các phần tử từ DOM
const nicknameInput = document.getElementById("nickname-input");
const nameInput = document.getElementById("name-input");
const ageInput = document.getElementById("age-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");
const imgContainer = document.getElementById("img-container");

// Hàm thiết lập dữ liệu cơ sở cho form
const setBaseData = (userInfo) => {
    nicknameInput.value = userInfo.nickname;
    nameInput.value = userInfo.name;
    ageInput.value = userInfo.age;
    emailInput.value = userInfo.email;
    phoneInput.value = userInfo.phone;

    if (userInfo.profileImg) {
        const imageElem = document.createElement("img");
        imageElem.className = "img-thumbnail rounded";
        imageElem.src = userInfo.profileImg;
        imgContainer.innerHTML = ""; // Xóa nội dung cũ
        imgContainer.appendChild(imageElem); // Thêm hình ảnh mới
    }
};

// Fetch thông tin người dùng
fetch("/users/get-user-info", {
    headers: {
        "Authorization": `Bearer ${jwt}`, // Thêm JWT vào header
    },
})
    .then(response => {
        if (!response.ok) {
            localStorage.removeItem("token");
            location.href = "/views/users/login"; // Chuyển hướng đến trang đăng nhập nếu không hợp lệ
        }
        return response.json(); // Chuyển đổi phản hồi sang JSON
    })
    .then(setBaseData) // Thiết lập dữ liệu vào form

    .catch(error => {
        console.error('Lỗi khi tải thông tin người dùng:', error);
        alert('Có lỗi xảy ra khi tải thông tin người dùng.');
    });

// Lắng nghe sự kiện submit của form cập nhật thông tin
const updateForm = document.getElementById("update-form");
updateForm.addEventListener("submit", e => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    const nickname = nicknameInput.value;
    const name = nameInput.value;
    const age = parseInt(ageInput.value);
    const email = emailInput.value;
    const phone = phoneInput.value;

    // Tạo đối tượng dữ liệu
    const body = { nickname, name, age, email, phone };

    // Gửi yêu cầu PUT cập nhật thông tin người dùng
    fetch("/users/update", {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Thêm JWT vào header
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Chuyển đổi đối tượng thành chuỗi JSON
    })
        .then(response => {
            if (response.ok) {
                alert('Cập nhật thông tin thành công!'); // Thông báo thành công
                location.reload(); // Làm mới trang để cập nhật dữ liệu
            } else if (response.status === 403) {
                alert('Không có quyền truy cập. Vui lòng đăng nhập lại.'); // Thông báo lỗi 403
                location.href = "/views/users/login"; // Chuyển hướng đến trang đăng nhập
            } else {
                alert('Có lỗi xảy ra: ' + response.status); // Thông báo lỗi khác
            }
        })
        .catch(error => {
            console.error('Lỗi khi cập nhật thông tin:', error);
            alert('Có lỗi xảy ra trong quá trình cập nhật thông tin.');
        });
});

// Lắng nghe sự kiện submit của form cập nhật hình ảnh
const imageForm = document.getElementById("profile-img-form");
imageForm.addEventListener("submit", e => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    const formData = new FormData(); // Tạo đối tượng FormData để gửi tệp
    const imageInput = imageForm.querySelector("input[type='file']"); // Lấy input hình ảnh
    formData.append("file", imageInput.files[0]); // Thêm tệp hình ảnh vào FormData

    // Gửi yêu cầu PUT để cập nhật hình ảnh người dùng
    fetch("/users/profile", {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${jwt}`, // Thêm JWT vào header
        },
        body: formData, // Gửi FormData với tệp hình ảnh
    })
        .then(response => {
            if (response.ok) {
                alert('Cập nhật hình ảnh thành công!'); // Thông báo thành công
                location.reload(); // Làm mới trang để cập nhật hình ảnh
            } else if (response.status === 403) {
                alert('Không có quyền truy cập. Vui lòng đăng nhập lại.'); // Thông báo lỗi 403
                location.href = "/views/users/login"; // Chuyển hướng đến trang đăng nhập
            } else {
                alert('Có lỗi xảy ra: ' + response.status); // Thông báo lỗi khác
            }
        })
        .catch(error => {
            console.error('Lỗi khi cập nhật hình ảnh:', error);
            alert('Có lỗi xảy ra trong quá trình cập nhật hình ảnh.');
        });
});




