document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('#starRating .star');
    const ratingInput = document.getElementById('rating');

    stars.forEach(star => {
        star.addEventListener('click', function () {
            const selectedRating = this.getAttribute('data-value');
            ratingInput.value = selectedRating; // Set the hidden input value

            // Highlight the selected stars
            stars.forEach(s => {
                s.classList.remove('selected');
            });
            for (let i = 0; i < selectedRating; i++) {
                stars[i].classList.add('selected');
            }
        });
    });

    document.getElementById('reviewForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const restaurantId = document.getElementById('restaurantId').value;
        const reviewText = document.getElementById('reviewText').value;
        const rating = ratingInput.value;

        fetch(`/users/review/${restaurantId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating: rating, text: reviewText }), // Adjust the body according to your ReviewDto structure
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('Review created with ID:', data);
                // Optionally redirect or show a success message
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    });
});
