document.addEventListener("DOMContentLoaded", function () {
    fetchRestaurantReservations();
});

let selectedReservationId = null;

async function fetchRestaurantReservations() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in to view reservations.");
        window.location.href = "/views/users/login";
        return;
    }

    try {
        const response = await fetch("/reservation/restaurant", {
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
                <p><strong>Guest Name:</strong> ${reservation.name}</p>
                <p><strong>Date:</strong> ${reservation.date}</p>
                <p><strong>Time:</strong> ${reservation.reservationTime}</p>
                <p><strong>Party Size:</strong> ${reservation.partySize}</p>
                <p><strong>Status:</strong> ${reservation.status}</p>
                <button class="confirm-button" onclick="confirmReservation(${reservation.id})">Confirm</button>
                <button class="complete-button" onclick="completeReservation(${reservation.id})">Complete</button>
                <button class="cancel-button" onclick="openCancelModal(${reservation.id})">Cancel</button>
            `;
            reservationsList.appendChild(reservationCard);
        });
    }
}

function openCancelModal(reservationId) {
    selectedReservationId = reservationId;
    document.getElementById("cancel-modal").style.display = "block";
}

function closeCancelModal() {
    document.getElementById("cancel-modal").style.display = "none";
}

async function confirmReservation(reservationId) {
    await updateReservationStatus(reservationId, "confirm");
}

async function completeReservation(reservationId) {
    await updateReservationStatus(reservationId, "complete");
}

async function updateReservationStatus(reservationId, action) {
    const token = localStorage.getItem("token");

    try {
        const endpointMap = {
            confirm: `/reservation/restaurant/${reservationId}/confirm`,
            complete: `/reservation/restaurant/${reservationId}/complete`
        };

        const response = await fetch(endpointMap[action], {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert(`Reservation ${action}ed successfully.`);
            fetchRestaurantReservations(); // Refresh the list
        } else {
            console.error(`Failed to ${action} reservation.`);
            alert(`Failed to ${action} reservation.`);
        }
    } catch (error) {
        console.error(`Error ${action}ing reservation:`, error);
        alert(`An error occurred. Please try again later.`);
    }
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
        const response = await fetch(`/reservation/restaurant/${selectedReservationId}/cancel`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ reason })
        });

        if (response.ok) {
            alert("Reservation cancelled successfully.");
            fetchRestaurantReservations(); // Refresh the list
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
