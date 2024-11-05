// JavaScript to handle form submission
document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    const restaurantId = document.getElementById('restaurantId').value;

    // Gửi yêu cầu đặt bàn đến server
    fetch(`/reservation/create?restaurantId=${restaurantId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
            date: date,
            time: time,
            guests: guests,
        }),
    })
        .then(response => {
            if (response.ok) {
                alert('Đặt bàn thành công!');
                // Có thể chuyển hướng đến trang khác hoặc làm gì đó khác sau khi đặt bàn
            } else {
                alert('Đặt bàn không thành công!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi! Vui lòng thử lại.');
        });
});

// Lấy restaurantId từ URL
const urlParams = new URLSearchParams(window.location.search);
document.getElementById('restaurantId').value = urlParams.get('restaurantId');
