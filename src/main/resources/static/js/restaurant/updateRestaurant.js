document.getElementById('updateForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    address: document.getElementById('address').value
  };

  try {
    const response = await fetch('/restaurant/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      alert("Restaurant information updated successfully!");
    } else {
      alert("Error updating information.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error updating information.");
  }
});
