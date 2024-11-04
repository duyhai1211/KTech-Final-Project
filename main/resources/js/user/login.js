function signIn() {
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

    fetch('/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sign In Success:', data);
        alert('Sign In Successful');
    })
    .catch(error => console.error('Error:', error));
}
