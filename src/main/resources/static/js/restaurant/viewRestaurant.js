async function loadRestaurantInfo() {
  try {
    const response = await fetch('/restaurant');
    const restaurant = await response.json();
    document.getElementById('restaurantInfo').innerHTML = `
      <p>Name: ${restaurant.name}</p>
      <p>Address: ${restaurant.address}</p>
    `;
  } catch (error) {
    console.error("Error:", error);
  }
}

loadRestaurantInfo();
