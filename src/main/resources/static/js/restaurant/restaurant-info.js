document.addEventListener("DOMContentLoaded", function() {
    loadRestaurantInfo();
});

async function loadRestaurantInfo() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Please log in to view your restaurant information.");
        window.location.href = "/views/users/login";
        return;
    }

    try {
        const response = await fetch('/restaurant/current', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const restaurant = await response.json();

            // Ensure all elements exist before populating them
            document.getElementById('restaurant-name').textContent = restaurant.name || "N/A";
            document.getElementById('restaurant-address').textContent = restaurant.address || "N/A";
            document.getElementById('restaurant-phone').textContent = restaurant.phoneNumber || "N/A";
            document.getElementById('restaurant-capacity').textContent = restaurant.capacity || "N/A";
            document.getElementById('restaurant-description').textContent = restaurant.description || "N/A";
            document.getElementById('restaurant-registration').textContent = restaurant.registrationNum || "N/A";
            document.getElementById('restaurant-category').textContent = restaurant.category || "N/A";
            document.getElementById('restaurant-open-time').textContent = restaurant.openTime || "N/A";
            document.getElementById('restaurant-close-time').textContent = restaurant.closeTime || "N/A";
            document.getElementById('restaurant-image').src = restaurant.profileImage || "/static/img/default-restaurant.png";
        } else if (response.status === 403) {
            alert("You do not have permission to view this restaurant.");
            window.location.href = "/views/users/login";
        } else {
            const errorData = await response.json();
            console.error("Failed to load restaurant information:", errorData.message);
            alert(`An error occurred while loading the restaurant information: ${errorData.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error fetching restaurant information:", error);
        alert("An error occurred while loading the restaurant information. Please try again later.");
    }
}
