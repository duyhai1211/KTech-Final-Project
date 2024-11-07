document.getElementById('requestOpenForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    address: document.getElementById('address').value
  };

  try {
    const response = await fetch('/restaurant/request-open', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      document.getElementById('responseMessage').innerText = "Request submitted successfully!";
    } else {
      document.getElementById('responseMessage').innerText = "Error submitting request.";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById('responseMessage').innerText = "Error submitting request.";
  }
});
