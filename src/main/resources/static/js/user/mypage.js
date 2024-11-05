document.addEventListener('DOMContentLoaded', function() {
    const updateInfoButton = document.querySelector('a[href="/views/users/update"]');
    const reviewsButton = document.querySelector('a[href="/views/reviews"]');
    const restaurantReservationsButton = document.querySelector('a[href="/views/restaurant-reservations"]');
    const myReservationsButton = document.querySelector('a[href="/views/my-reservations"]');

    // Event listener for "Update Info" button
    updateInfoButton.addEventListener('click', function(event) {
        console.log("Update Info button clicked");
    });

    // Event listener for "Reviews" button
    reviewsButton.addEventListener('click', function(event) {
        console.log("Reviews button clicked");
    });

    // Event listener for "Restaurant Reservations" button
    restaurantReservationsButton.addEventListener('click', function(event) {
        console.log("Restaurant Reservations button clicked");
    });

    // Event listener for "My Reservations" button
    myReservationsButton.addEventListener('click', function(event) {
        console.log("My Reservations button clicked");
    });
});
