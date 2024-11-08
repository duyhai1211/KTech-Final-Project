document.getElementById("restaurantForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

    // Prepare the data from the form
    const restaurantData = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        capacity: parseInt(document.getElementById("capacity").value),
        phoneNumber: document.getElementById("phoneNumber").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
    };

    try {
        const response = await fetch("/restaurant/request-open", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(restaurantData)
        });

        if (response.ok) {
            const data = await response.json();
            alert("Restaurant request submitted successfully!");
            console.log("Created Open Request:", data);
            window.location.href = "/views/myrestaurant"; // Redirect to the user's page or home page
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || "Failed to submit request"}`);
        }
    } catch (error) {
        console.error("Error submitting restaurant request:", error);
        alert("An error occurred while submitting the request.");
    }
});
