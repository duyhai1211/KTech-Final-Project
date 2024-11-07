document.addEventListener("DOMContentLoaded", function() {
    fetchAllRestaurants();
});

async function fetchAllRestaurants() {
    try {
        const response = await fetch('/restaurant/all');
        if (response.ok) {
            const data = await response.json();
            displayRestaurants(data.content);
        } else {
            console.error("Failed to fetch restaurant list.");
            document.getElementById('restaurantList').textContent = "No restaurants found.";
        }
    } catch (error) {
        console.error('Error fetching restaurant list:', error);
    }
}

function displayRestaurants(restaurants) {
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = ''; // Clear existing content

    if (restaurants.length === 0) {
        restaurantList.textContent = "No restaurants available.";
        return;
    }

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.classList.add('restaurant-card');

        // Set up the card as a clickable element to navigate to the detail page
        card.onclick = function() {
            window.location.href = `/views/restaurant/${restaurant.id}`;
        };

        card.innerHTML = `
            <img src="${restaurant.profileImage || '/static/img/default-restaurant.png'}" alt="${restaurant.name}">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.description}</p>
            <p><strong>Address:</strong> ${restaurant.address}</p>
            <p><strong>Phone:</strong> ${restaurant.phoneNumber}</p>
            <p><strong>Status:</strong> ${restaurant.status}</p>
        `;

        restaurantList.appendChild(card);
    });
}
