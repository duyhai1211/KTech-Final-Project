// Tải thông tin nhà hàng hiện tại khi trang được mở
async function loadRestaurantInfo() {
  try {
    const response = await fetch('/restaurant');
    if (response.ok) {
      const restaurant = await response.json();

      document.getElementById('name').value = restaurant.name;
      document.getElementById('address').value = restaurant.address;
      document.getElementById('capacity').value = restaurant.capacity;
      document.getElementById('phoneNumber').value = restaurant.phoneNumber;
      document.getElementById('description').value = restaurant.description;
      document.getElementById('registrationNum').value = restaurant.registrationNum;
      document.getElementById('openTime').value = restaurant.openTime;
      document.getElementById('closeTime').value = restaurant.closeTime;
      document.getElementById('category').value = restaurant.category;
    } else {
      document.getElementById('responseMessage').innerText = "Error loading restaurant information.";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById('responseMessage').innerText = "Error loading restaurant information.";
  }
}

// Cập nhật thông tin nhà hàng
document.getElementById('updateRestaurantForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Tạo dữ liệu từ các trường nhập liệu trong form
  const data = {
    name: document.getElementById('name').value,
    address: document.getElementById('address').value,
    capacity: parseInt(document.getElementById('capacity').value),
    phoneNumber: document.getElementById('phoneNumber').value,
    description: document.getElementById('description').value,
    registrationNum: document.getElementById('registrationNum').value,
    openTime: document.getElementById('openTime').value,
    closeTime: document.getElementById('closeTime').value,
    category: document.getElementById('category').value
  };

  try {
    const response = await fetch('/restaurant/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      document.getElementById('responseMessage').innerText = "Restaurant information updated successfully!";
    } else {
      document.getElementById('responseMessage').innerText = "Error updating information.";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById('responseMessage').innerText = "Error updating information.";
  }
});

// Gọi hàm để tải thông tin nhà hàng khi trang được tải
loadRestaurantInfo();
