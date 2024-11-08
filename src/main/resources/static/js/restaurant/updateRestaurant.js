document.addEventListener("DOMContentLoaded", function() {
  loadRestaurantDetails();
});

async function loadRestaurantDetails() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in to view and update restaurant information.");
    window.location.href = "/views/users/login";
    return;
  }

  try {
    const response = await fetch("/restaurant/current", { // Update with the correct endpoint to get restaurant details
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById("name").value = data.name;
      document.getElementById("address").value = data.address;
      document.getElementById("capacity").value = data.capacity;
      document.getElementById("phoneNumber").value = data.phoneNumber;
      document.getElementById("description").value = data.description;
      document.getElementById("registrationNum").value = data.registrationNum;
      document.getElementById("openTime").value = data.openTime;
      document.getElementById("closeTime").value = data.closeTime;
      document.getElementById("category").value = data.category;
    } else {
      console.error("Failed to load restaurant details.");
      alert("Could not load restaurant details.");
    }
  } catch (error) {
    console.error("Error loading restaurant details:", error);
  }
}

// Event listener for form submission
document.getElementById("update-restaurant-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in to update restaurant information.");
    window.location.href = "views/users/login";
    return;
  }

  const restaurantData = {
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
    capacity: parseInt(document.getElementById("capacity").value),
    phoneNumber: document.getElementById("phoneNumber").value,
    description: document.getElementById("description").value,
    registrationNum: document.getElementById("registrationNum").value,
    openTime: document.getElementById("openTime").value,
    closeTime: document.getElementById("closeTime").value,
    category: document.getElementById("category").value
  };

  try {
    const response = await fetch("/restaurant/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(restaurantData)
    });

    if (response.ok) {
      alert("Restaurant information updated successfully!");
      window.location.reload();
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message || "Failed to update restaurant information."}`);
    }
  } catch (error) {
    console.error("Error updating restaurant:", error);
    alert("An error occurred while updating the restaurant.");
  }
});
