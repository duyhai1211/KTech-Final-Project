// Yêu cầu mở nhà hàng
document.getElementById('openRestaurantForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const restaurantName = document.getElementById('restaurantName').value;

    fetch('/restaurant/request-open', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: restaurantName })
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                alert('Yêu cầu mở nhà hàng đã được gửi thành công.');
                document.getElementById('restaurantName').value = '';
            } else {
                alert('Đã xảy ra lỗi khi gửi yêu cầu.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi khi gửi yêu cầu.');
        });
});

// Lấy thông tin nhà hàng
document.getElementById('getRestaurantInfoBtn').addEventListener('click', function () {
    fetch('/restaurant', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const restaurantInfoDiv = document.getElementById('restaurantInfo');
            if (data) {
                restaurantInfoDiv.innerHTML = `
                <h4>Tên nhà hàng: ${data.name}</h4>
                <p>Địa chỉ: ${data.address}</p>
                <p>Số điện thoại: ${data.phone}</p>
                <p>Trạng thái: ${data.status}</p>
            `;
            } else {
                restaurantInfoDiv.innerHTML = '<p>Không tìm thấy thông tin nhà hàng.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('restaurantInfo').innerHTML = '<p>Đã xảy ra lỗi khi tải thông tin nhà hàng.</p>';
        });
});

// Mở nhà hàng
document.getElementById('openRestaurantBtn').addEventListener('click', function () {
    fetch('/restaurant/open', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                alert('Nhà hàng đã được mở thành công.');
                // Cập nhật thông tin nhà hàng
                document.getElementById('restaurantInfo').innerHTML = `<p>Trạng thái: Đã mở</p>`;
            } else {
                alert('Đã xảy ra lỗi khi mở nhà hàng.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi khi mở nhà hàng.');
        });
});
