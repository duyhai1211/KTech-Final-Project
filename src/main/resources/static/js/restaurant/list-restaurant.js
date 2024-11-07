document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display all restaurants on page load
    fetchAllRestaurants();
});

// Function to fetch all restaurants from the API
function fetchAllRestaurants() {
    fetch("/restaurant/all")
        .then(response => response.json())
        .then(data => {
            const restaurantList = document.getElementById("restaurantList");
            restaurantList.innerHTML = ""; // Clear any existing content

            if (data.content && data.content.length > 0) {
                // Display each restaurant using the API data
                data.content.forEach(restaurant => {
                    const card = createRestaurantCard(restaurant);
                    restaurantList.appendChild(card);
                });
            } else {
                // Show message if no restaurants found
                restaurantList.innerHTML = "<p>No restaurants found.</p>";
            }
        })
        .catch(error => console.error("Error fetching restaurants:", error));
}

// Function to create and return a restaurant card element
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
