document.getElementById('createMenuForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value
  };

  try {
    const response = await fetch('/restaurant/menu/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      document.getElementById('responseMessage').innerText = "Menu item created successfully!";
    } else {
      document.getElementById('responseMessage').innerText = "Error creating menu item.";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById('responseMessage').innerText = "Error creating menu item.";
  }
});
