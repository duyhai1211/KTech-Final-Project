function signUp() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const email = document.getElementById('signup-email').value;

    fetch('/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sign Up Success:', data);
        alert('Sign Up Successful');
    })
    .catch(error => console.error('Error:', error));
}
