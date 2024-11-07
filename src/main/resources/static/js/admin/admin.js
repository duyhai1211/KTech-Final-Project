document.addEventListener("DOMContentLoaded", function() {
    fetchPendingRequests();
});

async function fetchPendingRequests() {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch('/admin/all', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch pending requests');
        }
        const requests = await response.json();
        renderRequests(requests);
    } catch (error) {
        console.error('Error fetching pending requests:', error);
    }
}

function renderRequests(requests) {
    const container = document.getElementById('requests-container');
    container.innerHTML = '';
    requests.forEach(request => {
        const requestElement = document.createElement('div');
        requestElement.classList.add('request', 'mb-3', 'p-3', 'border', 'rounded');
        requestElement.innerHTML = `
            <h5>Yêu cầu ID: ${request.id}</h5>
            <p><strong>Tên nhà hàng:</strong> ${request.restaurant.name}</p>
            <p><strong>Mô tả:</strong> ${request.restaurant.description}</p>
            <p><strong>Địa chỉ:</strong> ${request.restaurant.address}</p>
            <p><strong>Số điện thoại:</strong> ${request.restaurant.phoneNumber}</p>
            <p><strong>Sức chứa:</strong> ${request.restaurant.capacity}</p>
            <p><strong>Danh mục:</strong> ${request.restaurant.category}</p>
            <p><strong>Trạng thái:</strong> ${request.restaurant.status}</p>
            ${request.restaurant.closeReason ? `<p><strong>Lý do đóng:</strong> ${request.restaurant.closeReason}</p>` : ''}
            <p><strong>Lý do từ chối:</strong> ${request.reason}</p>
            <div class="d-flex justify-content-between">
                <button class="btn btn-info" onclick="viewDetails(${request.id})">Xem chi tiết</button>
                <button class="btn btn-success" onclick="approveRequest(${request.id})">Phê duyệt</button>
                <button class="btn btn-danger" onclick="rejectRequest(${request.id})">Từ chối</button>
            </div>
        `;
        container.appendChild(requestElement);
    });
}


async function viewDetails(requestId) {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`/admin/${requestId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch request details');
        }
        const request = await response.json();

        // Điền thông tin chi tiết vào modal
        document.getElementById('modal-body-content').innerHTML = `
            <p><strong>ID Yêu cầu:</strong> ${request.id}</p>
            <p><strong>Tên nhà hàng:</strong> ${request.restaurant.name}</p>
            <p><strong>Mô tả:</strong> ${request.restaurant.description}</p>
            <p><strong>Địa chỉ:</strong> ${request.restaurant.address}</p>
            <p><strong>Số điện thoại:</strong> ${request.restaurant.phoneNumber}</p>
            <p><strong>Sức chứa:</strong> ${request.restaurant.capacity}</p>
            <p><strong>Danh mục:</strong> ${request.restaurant.category}</p>
            <p><strong>Trạng thái:</strong> ${request.restaurant.status}</p>
            ${request.restaurant.closeReason ? `<p><strong>Lý do đóng:</strong> ${request.restaurant.closeReason}</p>` : ''}
            <p><strong>Lý do yêu cầu mở:</strong> ${request.reason}</p>
        `;

        // Hiển thị modal
        $('#detailsModal').modal('show');
    } catch (error) {
        console.error('Error fetching request details:', error);
    }
}


async function approveRequest(requestId) {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`/admin/${requestId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to approve request');
        }
        alert('Yêu cầu đã được phê duyệt.');
        fetchPendingRequests();
    } catch (error) {
        console.error('Error approving request:', error);
    }
}

async function rejectRequest(requestId) {
    const reason = prompt('Nhập lý do từ chối:');
    if (!reason) {
        return;
    }
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`/admin/${requestId}/reject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ reason: reason }) // Đặt lý do từ chối vào object JSON
        });
        if (!response.ok) {
            throw new Error('Failed to reject request');
        }
        alert('Yêu cầu đã bị từ chối.');
        fetchPendingRequests();
    } catch (error) {
        console.error('Error rejecting request:', error);
    }
}
