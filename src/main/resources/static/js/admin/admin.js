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
        requestElement.classList.add('request');
        requestElement.innerHTML = `
            <h3>Yêu cầu ID: ${request.id}</h3>
            <p>Tên nhà hàng: ${request.restaurantName}</p>
            <p>Địa chỉ: ${request.address}</p>
            <button onclick="viewDetails(${request.id})">Xem chi tiết</button>
            <button onclick="approveRequest(${request.id})">Phê duyệt</button>
            <button onclick="rejectRequest(${request.id})">Từ chối</button>
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
        alert(`Chi tiết yêu cầu:\n\nTên nhà hàng: ${request.restaurantName}\nĐịa chỉ: ${request.address}\nNgười yêu cầu: ${request.requesterName}`);
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
            body: JSON.stringify(reason)
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
