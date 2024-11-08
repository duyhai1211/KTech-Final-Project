document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display all restaurants on page load
    fetchRestaurants();

    // Add event listener for the search button
    document.getElementById("searchButton").addEventListener("click", () => {
        const keyword = document.getElementById("searchInput").value.trim();
        fetchRestaurants(keyword);
    });
});

// Function to fetch restaurants with an optional search keyword
function fetchRestaurants(keyword = "") {
    const url = keyword ? `/search?keyword=${encodeURIComponent(keyword)}` : "restaurant/all";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const restaurantList = document.getElementById("restaurantList");
            restaurantList.innerHTML = ""; // Clear previous results

            if (data.content && data.content.length > 0) {
                data.content.forEach(restaurant => {
                    const card = createRestaurantCard(restaurant);
                    restaurantList.appendChild(card);
                });
            } else {
                restaurantList.innerHTML = "<p>No restaurants found.</p>";
            }
        })
        .catch(error => console.error("Error fetching restaurants:", error));
}

// Function to create a restaurant card element
function createRestaurantCard(restaurant) {
    const card = document.createElement("div");
    card.className = "restaurant-card";
    card.innerHTML = `
        <img src="${restaurant.profileImage || 'default.jpg'}" alt="Restaurant Image">
        <h3>${restaurant.name}</h3>
        <p>${restaurant.description}</p>
        <p>Address: ${restaurant.address}</p>
        <p>Phone: ${restaurant.phoneNumber}</p>
        <p>Status: ${restaurant.status}</p>
    `;
    return card;
}


// Hàm chuyển hướng đến trang home.html
function redirectToHome() {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
        // Nếu có token, có thể làm gì đó với nó nếu cần
        console.log("Chuyển hướng đến home với token:", token);
    }
    // Chuyển hướng đến home.html
    window.location.href = '/views/users/home';
}

// Lắng nghe sự kiện click cho liên kết Home
document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.querySelector('a[href="/views/users"]'); // Tìm liên kết Home
    if (homeLink) {
        homeLink.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
            redirectToHome(); // Gọi hàm để chuyển hướng
        });
    } else {
        console.error("Không tìm thấy liên kết Home");
    }
});

// myrestaurant.js


// Hàm chuyển hướng đến trang home.html
function redirectToHome() {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
        // Nếu có token, có thể làm gì đó với nó nếu cần
        console.log("Chuyển hướng đến home với token:", token);
    }
    // Chuyển hướng đến home.html
    window.location.href = '/views/myrestaurant';
}

// Lắng nghe sự kiện click cho liên kết Home
document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.querySelector('a[href="/views/myrestaurant"]'); // Tìm liên kết Home
    if (homeLink) {
        homeLink.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
            redirectToHome(); // Gọi hàm để chuyển hướng
        });
    } else {
        console.error("Không tìm thấy liên kết MyRestaurant");
    }
});



