document.getElementById('requestOpenForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Tạo dữ liệu từ các trường nhập liệu trong form
  const data = {
    name: document.getElementById('name').value,
    address: document.getElementById('address').value,
    capacity: parseInt(document.getElementById('capacity').value),
    phoneNumber: document.getElementById('phoneNumber').value,
    description: document.getElementById('description').value,
    category: document.getElementById('category').value
  };

  try {
    // Gọi API để gửi yêu cầu mở nhà hàng mới
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
