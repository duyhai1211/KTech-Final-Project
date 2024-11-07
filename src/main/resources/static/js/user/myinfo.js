document.addEventListener("DOMContentLoaded", function() {
    fetchUserInfo();
});

async function fetchUserInfo() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "/views/users/login"; // Absolute path for redirection
        return;
    }

    try {
        const response = await fetch('/users/get-user-info', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('user-nickname').textContent = data.nickname || "User";
            document.getElementById('user-email').textContent = data.email;
            document.getElementById('user-phone').textContent = data.phone;
            document.getElementById('user-avatar').src = data.profileImg || "https://via.placeholder.com/50";
            document.getElementById('user-greeting').textContent = `Hello, ${data.nickname || "User"}`;
        } else if (response.status === 401) {
            alert("Your session has expired. Please log in again.");
            localStorage.removeItem('jwtToken');
            window.location.href = "/views/users/login"; // Absolute path
        } else {
            console.error("Failed to fetch user info.");
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

function redirectToEditPage() {
    window.location.href = "/views/users/editInfo.html"; // Adjusted absolute path
}

// Other functions remain the same, with adjusted paths if needed


// Placeholder function to load all reservations dynamically
function loadAllReservations() {
    // Fetch and display all reservation data
    console.log("Loading all reservations...");
    // Add your fetch code here for reservations if required
}

// Placeholder function to load all reviews dynamically
function loadAllReviews() {
    // Fetch and display all review data
    console.log("Loading all reviews...");
    // Add your fetch code here for reviews if required
}

// Update user information using the API
async function updateUserInfo() {
    const nickname = document.getElementById('nickname').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const token = localStorage.getItem('jwtToken');

    try {
        const response = await fetch('/users/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nickname, name, age, phone, email })
        });

        if (response.ok) {
            alert('User info updated successfully');
            fetchUserInfo(); // Refresh displayed user info
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating user info:', error);
    }
}

// Function to upload profile image
async function uploadProfileImage() {
    const fileInput = document.getElementById('profile-image');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('jwtToken');

    try {
        const response = await fetch('/users/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            alert('Profile image uploaded successfully');
            fetchUserInfo(); // Refresh displayed profile image
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error uploading profile image:', error);
    }
}
