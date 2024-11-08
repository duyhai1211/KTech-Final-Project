document.addEventListener("DOMContentLoaded", function () {
    fetchUserReservations();
});

let selectedReservationId = null;

async function fetchUserReservations() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in to view your reservations.");
        window.location.href = "/views/users/login";
        return;
    }

    try {
        const response = await fetch("/reservation/user", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const reservationsData = await response.json();
            displayReservations(reservationsData.content);
        } else {
            console.error("Failed to load reservations.");
            document.getElementById("no-reservations-message").style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching reservations:", error);
    }
}

function displayReservations(reservations) {
    const reservationsList = document.getElementById("reservations-list");
    reservationsList.innerHTML = ""; // Clear existing content

    if (reservations.length === 0) {
        document.getElementById("no-reservations-message").style.display = "block";
    } else {
        reservations.forEach(reservation => {
            const reservationCard = document.createElement("div");
            reservationCard.className = "reservation-card";
            reservationCard.innerHTML = `
                <p><strong>Restaurant:</strong> ${reservation.restaurantName}</p>
                <p><strong>Date:</strong> ${reservation.date}</p>
                <p><strong>Time:</strong> ${reservation.reservationTime}</p>
                <p><strong>Party Size:</strong> ${reservation.partySize}</p>
                <p><strong>Status:</strong> ${reservation.status}</p>
                <button class="cancel-button" onclick="openCancelModal(${reservation.id})">Cancel Reservation</button>
            `;
            reservationsList.appendChild(reservationCard);
        });
    }
}

function openCancelModal(reservationId) {
    // Ensure reservationId is correctly set
    if (!reservationId) {
        console.error("No reservation ID provided for cancellation.");
        return;
    }

    console.log("Opening cancel modal for reservation ID:", reservationId);
    selectedReservationId = reservationId; // Set the selected reservation ID
    document.getElementById("cancel-modal").style.display = "block";
}

function closeCancelModal() {
    document.getElementById("cancel-modal").style.display = "none";
    selectedReservationId = null; // Clear the selected reservation ID after closing the modal
}

async function confirmCancellation() {
    if (!selectedReservationId) {
        console.error("No reservation selected for cancellation.");
        alert("Error: No reservation selected for cancellation.");
        return;
    }

    const reason = document.getElementById("cancel-reason").value.trim();
    if (!reason) {
        alert("Please provide a cancellation reason.");
        return;
    }

    const token = localStorage.getItem("token");
    try {
        console.log("Submitting cancellation for reservation ID:", selectedReservationId);
        const response = await fetch(`/reservation/user/${selectedReservationId}/cancel`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ reason }) // Wrap reason in an object
        });

        if (response.ok) {
            alert("Reservation cancelled successfully.");
            fetchUserReservations(); // Refresh the list
            closeCancelModal();
        } else {
            const errorData = await response.json();
            console.error("Cancellation failed:", errorData.message);
            alert(`Cancellation failed: ${errorData.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error cancelling reservation:", error);
        alert("An error occurred. Please try again later.");
    }
}

// Close the modal when clicking outside the modal content
window.onclick = function (event) {
    const modal = document.getElementById("cancel-modal");
    if (event.target == modal) {
        closeCancelModal();
    }
};
