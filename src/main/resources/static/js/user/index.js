function getUserInfo() {
    fetch('/users/get-user-info')
    .then(response => response.json())
    .then(data => {
        console.log('User Info:', data);
        document.getElementById('user-info-result').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('Error:', error));
}
