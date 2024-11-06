function signUp() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const passwordCheck = document.getElementById('password-check').value;

    console.log({
        username,
        password,
        password_check: passwordCheck
    });

    fetch('/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, password_check: passwordCheck })
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(obj => {
        if (obj.status >= 200 && obj.status < 300) {
            console.log('Sign Up Success:', obj.body);
            alert('Đăng ký thành công!');
            window.location.href = '/login';
        } else {
            throw new Error(obj.body.message || 'Đăng ký thất bại.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`Đăng ký thất bại: ${error.message}`);
    });
}
