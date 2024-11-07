const apiUrl = 'http://localhost:8080';
let currentPage = 0;

document.addEventListener("DOMContentLoaded", function () {
  fetchReviews(currentPage);

  // Form submission for creating or updating a review
  document.getElementById("reviewForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const reviewId = document.getElementById("reviewId").value;
    if (reviewId) {
      updateReview(reviewId);
    } else {
      createReview();
    }
  });
});

function fetchReviews(page) {
  fetch(`${apiUrl}/users/review?page=${page}`)
    .then(response => response.json())
    .then(data => {
      populateReviewList(data.content);
      setupPagination(data.totalPages);
    })
    .catch(error => console.error('Error fetching reviews:', error));
}

function populateReviewList(reviews) {
  const reviewList = document.getElementById("review-list");
  reviewList.innerHTML = ""; // Clear previous data
  reviews.forEach(review => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${review.id}</td>
      <td>${review.restaurantId}</td>
      <td>${review.content}</td>
      <td>${review.rating}</td>
      <td class="actions">
        <button class="complete-btn" onclick="editReview(${review.id})">Edit</button>
        <button class="delete-btn" onclick="deleteReview(${review.id})">Delete</button>
      </td>
    `;
    reviewList.appendChild(row);
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
      fetchReviews(currentPage);
    });
    paginationDiv.appendChild(pageButton);
  }
}

function createReview() {
  const reservationId = document.getElementById("reservationId").value;
  const content = document.getElementById("content").value;
  const rating = document.getElementById("rating").value;

  fetch(`${apiUrl}/users/review/${reservationId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, rating })
  })
    .then(response => response.json())
    .then(() => {
      fetchReviews(currentPage);
      clearForm();
    })
    .catch(error => console.error("Error creating review:", error));
}

function editReview(id) {
  fetch(`${apiUrl}/users/review/${id}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("reviewId").value = data.id;
      document.getElementById("reservationId").value = data.reservationId;
      document.getElementById("content").value = data.content;
      document.getElementById("rating").value = data.rating;
    })
    .catch(error => console.error("Error fetching review:", error));
}

function updateReview(id) {
  const content = document.getElementById("content").value;
  const rating = document.getElementById("rating").value;

  fetch(`${apiUrl}/users/review/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, rating })
  })
    .then(() => {
      fetchReviews(currentPage);
      clearForm();
    })
    .catch(error => console.error("Error updating review:", error));
}

function deleteReview(id) {
  fetch(`${apiUrl}/users/review/${id}`, { method: "DELETE" })
    .then(() => fetchReviews(currentPage))
    .catch(error => console.error("Error deleting review:", error));
}

function clearForm() {
  document.getElementById("reviewForm").reset();
  document.getElementById("reviewId").value = "";
}
