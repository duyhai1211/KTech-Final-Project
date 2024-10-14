import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách các đặt chỗ
    axios.get('https://api.yourbackend.com/reservations')
      .then(response => setReservations(response.data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  return (
    <div>
      <h1>Danh sách đặt chỗ</h1>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div key={reservation.id}>
            <p>Nhà hàng: {reservation.restaurantName}</p>
            <p>Ngày: {reservation.date}</p>
            <p>Giờ: {reservation.time}</p>
            <p>Số người: {reservation.numberOfPeople}</p>
            <p>Trạng thái: {reservation.status}</p>
          </div>
        ))
      ) : (
        <p>Không có đặt chỗ nào.</p>
      )}
    </div>
  );
};

export default ReservationList;
