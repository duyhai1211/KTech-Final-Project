// Hàm gửi yêu cầu để mở nhà hàng
function submitRestaurantRequest(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Lấy thông tin từ các trường trong form
    const restaurantData = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        capacity: document.getElementById('capacity').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value
    };

    // Gửi thông tin đến server
    fetch('/api/restaurant/request-open', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(restaurantData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error submitting request: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Hiển thị thông báo thành công
            document.getElementById('responseMessage').innerText = "Request submitted successfully!";
            document.getElementById('responseMessage').style.color = 'green';

            // Chuyển hướng đến trang My Restaurant
            window.location.href = '/views/myrestaurant'; // Đường dẫn đến trang myrestaurant
        })
        .catch(error => {
            // Hiển thị thông báo lỗi
            document.getElementById('responseMessage').innerText = error.message || "Error submitting request.";
            document.getElementById('responseMessage').style.color = 'red';
        });
}

// Gán sự kiện submit cho form
document.getElementById('requestOpenForm').addEventListener('submit', submitRestaurantRequest);
