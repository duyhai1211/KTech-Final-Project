const apiUrl = 'http://localhost:8080/reservation/user';
let currentPage = 0;

document.addEventListener("DOMContentLoaded", function () {
  fetchReservations(currentPage);
});

function fetchReservations(page) {
  fetch(`${apiUrl}?page=${page}`)
    .then(response => response.json())
    .then(data => {
      populateTable(data.content);
      setupPagination(data.totalPages);
    })
    .catch(error => console.error('Error fetching reservations:', error));
}

function populateTable(reservations) {
  const reservationList = document.getElementById("reservation-list");
  reservationList.innerHTML = ""; // Clear previous data
  reservations.forEach(reservation => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${reservation.id}</td>
      <td>${reservation.restaurantId}</td>
      <td>${reservation.date}</td>
      <td>${reservation.status}</td>
      <td class="actions">
        <button class="complete-btn" onclick="completeReservation(${reservation.id})">Complete</button>
        <button class="cancel-btn" onclick="cancelReservation(${reservation.id})">Cancel</button>
      </td>
    `;
    reservationList.appendChild(row);
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

function cancelReservation(reservationId) {
  const reason = prompt("Please enter a reason for cancellation:");
  fetch(`${apiUrl}/${reservationId}/cancel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reason)
  })
    .then(response => response.json())
    .then(() => fetchReservations(currentPage))
    .catch(error => console.error("Error canceling reservation:", error));
}
