document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('restaurantId'); // Extract restaurantId from the query parameter

    if (restaurantId) {
        loadRestaurantName(restaurantId); // Load the restaurant name at the top of the reservation page

        const reservationForm = document.getElementById("reservationForm");
        reservationForm.addEventListener("submit", function (event) {
            event.preventDefault();
            submitReservation(restaurantId);
        });
    } else {
        console.error("Restaurant ID is missing in the URL.");
        alert("An error occurred. Please try accessing the reservation page again.");
    }
});


// Function to load and display the restaurant name
async function loadRestaurantName(restaurantId) {
    try {
        const response = await fetch(`/restaurant/${restaurantId}`);
        if (response.ok) {
            const restaurant = await response.json();
            document.getElementById("restaurant-name").textContent = restaurant.name || "Restaurant";
        } else {
            console.error("Failed to load restaurant name. Status:", response.status);
            const errorText = await response.text();
            console.error("Response text:", errorText);
        }
    } catch (error) {
        console.error("Error fetching restaurant name:", error);
    }
}

async function submitReservation(restaurantId) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in to make a reservation.");
        window.location.href = "/views/users/login";
        return;
    }

    const reservationData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value,
        reservationTime: document.getElementById("time").value,
        partySize: parseInt(document.getElementById("partySize").value, 10),
    };

    try {
        const response = await fetch(`/reservation/create?restaurantId=${restaurantId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(reservationData)
        });

        if (response.ok) {
            alert("Reservation successfully created!");
            window.location.href = `/restaurant/${restaurantId}`; // Redirect to the restaurant detail page
        } else {
            const errorData = await response.json();
            console.error("Reservation failed:", errorData.message);
            alert(`Reservation failed: ${errorData.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error submitting reservation:", error);
        alert("An error occurred. Please try again later.");
    }
}
