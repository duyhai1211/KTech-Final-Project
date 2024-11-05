$(document).ready(function() {
    // Hoàn thành Đặt chỗ
    $('.complete-btn').on('click', function(e) {
        e.preventDefault();
        const reservationId = $(this).data('id');
        $.post(`/restaurant/${reservationId}/complete`, function(data) {
            alert("Đặt chỗ đã hoàn thành!");
            location.reload(); // Tải lại trang
        }).fail(function() {
            alert("Có lỗi xảy ra khi hoàn thành đặt chỗ.");
        });
    });

    // Xác nhận Đặt chỗ
    $('.confirm-btn').on('click', function(e) {
        e.preventDefault();
        const reservationId = $(this).data('id');
        $.post(`/restaurant/${reservationId}/confirm`, function(data) {
            alert("Đặt chỗ đã được xác nhận!");
            location.reload(); // Tải lại trang
        }).fail(function() {
            alert("Có lỗi xảy ra khi xác nhận đặt chỗ.");
        });
    });

    // Hủy Đặt chỗ
    $('.cancel-btn').on('click', function(e) {
        e.preventDefault();
        const reservationId = $(this).data('id');
        const reason = prompt("Nhập lý do hủy:");
        if (reason) {
            $.post(`/restaurant/${reservationId}/cancel`, { reason: reason }, function(data) {
                alert("Đặt chỗ đã được hủy!");
                location.reload(); // Tải lại trang
            }).fail(function() {
                alert("Có lỗi xảy ra khi hủy đặt chỗ.");
            });
        }
    });
});
