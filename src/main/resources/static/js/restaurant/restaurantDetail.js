document.addEventListener("DOMContentLoaded", function() {
    const restaurantId = window.location.pathname.split('/').pop();  // Extract restaurant ID from URL

    fetchRestaurantDetails(restaurantId);
    fetchRestaurantMenu(restaurantId);
    fetchRestaurantReviews(restaurantId);
});

// Fetch and display restaurant details
async function fetchRestaurantDetails(restaurantId) {
    try {
        const response = await fetch(`/restaurant/${restaurantId}`);
        if (response.ok) {
            const data = await response.json();
            document.getElementById('restaurant-name').textContent = data.name;
            document.getElementById('restaurant-description').textContent = data.description;
            document.getElementById('restaurant-address').textContent = data.address;
            document.getElementById('restaurant-phone').textContent = data.phoneNumber;
            document.getElementById('restaurant-category').textContent = data.category;
            document.getElementById('restaurant-status').textContent = data.status;
            document.getElementById('restaurant-open-time').textContent = data.openTime || "N/A";
            document.getElementById('restaurant-close-time').textContent = data.closeTime || "N/A";
            document.getElementById('restaurant-image').src = data.profileImage || '/static/img/default-restaurant.png';
        } else {
            console.error("Failed to fetch restaurant details.");
        }
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
    }
}

// Fetch and display restaurant menu
async function fetchRestaurantMenu(restaurantId) {
    try {
        const response = await fetch(`/restaurant/${restaurantId}/menu`);
        if (response.ok) {
            const menuData = await response.json();
            const menuList = document.getElementById('menu-list');
            menuList.innerHTML = "";  // Clear loading text

            if (menuData && menuData.length > 0) {
                menuData.forEach(menuItem => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('menu-item');
                    itemDiv.innerHTML = `
                        <img src="${menuItem.img || '/static/img/default-dish.png'}" alt="Menu Image" class="menu-image">
                        <p><strong>${menuItem.name}</strong></p>
                        <p>Price: ${menuItem.price} VND</p>
                        <p>${menuItem.description}</p>
                    `;
                    menuList.appendChild(itemDiv);
                });
            } else {
                menuList.textContent = "No menu items available.";
            }
        } else {
            console.error("Failed to fetch menu items.");
        }
    } catch (error) {
        console.error('Error fetching menu items:', error);
    }
}



// Fetch and display restaurant reviews
async function fetchRestaurantReviews(restaurantId) {
    try {
        const response = await fetch(`/review/restaurant/${restaurantId}`);
        if (response.ok) {
            const reviewData = await response.json();  // Expecting an array instead of a paginated object
            const reviewsList = document.getElementById('reviews-list');
            reviewsList.innerHTML = "";  // Clear loading text

            if (reviewData.length > 0) {  // Since it's an array, check length directly
                reviewData.forEach(review => {
                    const reviewDiv = document.createElement('div');
                    reviewDiv.classList.add('review-item');
                    reviewDiv.innerHTML = `
                        <p><strong>${review.nickname || "Anonymous"}</strong> - Rating: ${review.rating}</p>
                        <p>${review.content}</p>
                        <p><small>Reviewed on: ${review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Unknown Date"}</small></p>
                    `;
                    reviewsList.appendChild(reviewDiv);
                });
            } else {
                reviewsList.textContent = "No reviews available.";
            }
        } else {
            console.error("Failed to fetch reviews. Status:", response.status);
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}


// Placeholder reservation function
function reserveTable() {
    alert('Reservation functionality coming soon!');
}
