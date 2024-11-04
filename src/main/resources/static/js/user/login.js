// Kiểm tra token đăng nhập, nếu có thì lấy thông tin người dùng
const jwt = localStorage.getItem("token") ?? null;
if (jwt) {
    fetch("/users/get-user-info", {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((response) => {
        if (response.ok) {
            location.href = "/views"; // Chuyển hướng đến trang chính nếu đã đăng nhập
        }
    });
}

// Đăng nhập người dùng
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    fetch("/users/signin", {
        // gọi đúng endpoint signin
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => {
            if (response.ok) return response.json();
            else throw Error("failed to login");
        })
        .then((json) => {
            localStorage.setItem("token", json.token);
            location.href = "/views"; // Chuyển hướng đến trang chính sau khi đăng nhập thành công
        })
        .catch((error) => alert(error.message));
});

// Đăng ký người dùng
const signupButton = document.getElementById("signup-button");
signupButton.addEventListener("click", () => {
    location.href = "/signup"; // Chuyển hướng đến trang đăng ký khi nhấn Sign Up
});

const signupForm = document.getElementById("signup-form");
const newUsernameInput = document.getElementById("new-username-input");
const newPasswordInput = document.getElementById("new-password-input");

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = newUsernameInput.value;
    const password = newPasswordInput.value;

    fetch("/users/signup", {
        // gọi đúng endpoint signup
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => {
            if (response.ok) return response.json();
            else throw Error("failed to signup");
        })
        .then((json) => {
            alert("Signup successful! Please login.");
            location.href = "/login"; // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
        })
        .catch((error) => alert(error.message));
});
