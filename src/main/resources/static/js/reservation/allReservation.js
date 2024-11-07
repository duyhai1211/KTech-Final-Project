const apiUrl = 'http://localhost:8080/reservation/user';
let currentPage = 0;

document.addEventListener("DOMContentLoaded", function () {
  fetchReservations(currentPage);
});

function fetchReservations(page) {
  fetch(`${apiUrl}?page=${page}`)
    .then(response => response.json())
    .then(data => {
      populateGrid(data.content);
      setupPagination(data.totalPages);
    })
    .catch(error => console.error('Error fetching reservations:', error));
}

function populateGrid(reservations) {
  const reservationGrid = document.getElementById("reservation-grid");
  reservationGrid.innerHTML = ""; // Clear previous data

  reservations.forEach(reservation => {
    const card = document.createElement("div");
    card.className = "reservation-card";

    card.innerHTML = `
      <img src="${reservation.imageUrl}" alt="Restaurant Image">
      <div class="reservation-info">
        <h2>${reservation.restaurantName}</h2>
        <p>Date: ${reservation.date}</p>
        <p>Status: ${reservation.status}</p>
      </div>
      <div class="actions">
        <button class="complete-btn" onclick="completeReservation(${reservation.id})">Complete</button>
        <button class="edit-btn" onclick="editReservation(${reservation.id})">Edit</button>
        <button class="delete-btn" onclick="deleteReservation(${reservation.id})">Delete</button>
      </div>
    `;
    reservationGrid.appendChild(card);
  });
}

function setupPagination(totalPages) {
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";

  for (let i = 0; i < totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i + 1;
    pageButton.classList.toggle("active", i === currentPage);
    pageButton.addEventListener("click", () => {
      currentPage = i;
      fetchReservations(currentPage);
    });
    paginationDiv.appendChild(pageButton);
  }
}

function completeReservation(reservationId) {
  fetch(`${apiUrl}/${reservationId}/complete`, { method: "POST" })
    .then(response => response.json())
    .then(() => fetchReservations(currentPage))
    .catch(error => console.error("Error completing reservation:", error));
}

function editReservation(reservationId) {
  const newRestaurantName = prompt("Enter new restaurant name:");
  const newDate = prompt("Enter new reservation date:");
  const newStatus = prompt("Enter new status:");

  fetch(`${apiUrl}/${reservationId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ restaurantName: newRestaurantName, date: newDate, status: newStatus })
  })
    .then(response => response.json())
    .then(() => fetchReservations(currentPage))
    .catch(error => console.error("Error editing reservation:", error));
}

function deleteReservation(reservationId) {
  if (confirm("Are you sure you want to delete this reservation?")) {
    fetch(`${apiUrl}/${reservationId}`, { method: "DELETE" })
      .then(() => fetchReservations(currentPage))
      .catch(error => console.error("Error deleting reservation:", error));
  }
}
