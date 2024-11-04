function searchOrder() {
    const orderId = document.getElementById('order-id').value;

    fetch(`/orders/search?id=${orderId}`)
    .then(response => response.json())
    .then(data => {
        console.log('Order Info:', data);
        document.getElementById('order-info-result').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('Error:', error));
}
