document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById("reviewForm");
    const reviewList = document.getElementById("review-list");
    const pagination = document.getElementById("pagination");

    // Fetch and display all reviews for the restaurant
    async function fetchReviewsByRestaurant(restaurantId) {
        try {
            const response = await fetch(`/review/restaurant/${restaurantId}`);
            const reviews = await response.json();
            displayReviews(reviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    // Display reviews in the table
    function displayReviews(reviews) {
        reviewList.innerHTML = "";
        reviews.forEach(review => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${review.id}</td>
                <td>${review.restaurantId}</td>
                <td>${review.content}</td>
                <td>${review.rating}</td>
                <td>
                    <button onclick="editReview(${review.id})">Edit</button>
                    <button onclick="deleteReview(${review.id})">Delete</button>
                </td>
            `;
            reviewList.appendChild(row);
        });
    }

    // Handle form submission for creating or updating a review
    reviewForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const reviewId = document.getElementById("reviewId").value;
        const reservationId = document.getElementById("reservationId").value;
        const content = document.getElementById("content").value;
        const rating = document.getElementById("rating").value;

        const reviewData = { content, rating };

        try {
            if (reviewId) {
                // Update review
                await fetch(`/users/review/${reviewId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(reviewData)
                });
                alert("Review updated successfully");
            } else {
                // Create review
                const response = await fetch(`/users/review/${reservationId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(reviewData)
                });
                if (response.ok) {
                    alert("Review created successfully");
                }
            }
            reviewForm.reset();
            fetchReviewsByRestaurant(restaurantId);
        } catch (error) {
            console.error("Error saving review:", error);
        }
    });

    // Edit a review
    window.editReview = async (id) => {
        try {
            const response = await fetch(`/users/review/${id}`);
            const review = await response.json();
            document.getElementById("reviewId").value = review.id;
            document.getElementById("content").value = review.content;
            document.getElementById("rating").value = review.rating;
        } catch (error) {
            console.error("Error fetching review:", error);
        }
    };

    // Delete a review
    window.deleteReview = async (id) => {
        if (!confirm("Are you sure you want to delete this review?")) return;

        try {
            await fetch(`/users/review/${id}`, {
                method: "DELETE"
            });
            alert("Review deleted successfully");
            fetchReviewsByRestaurant(restaurantId);
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    // Initial load
    const restaurantId = 1; // Replace with the actual restaurant ID
    fetchReviewsByRestaurant(restaurantId);
});
