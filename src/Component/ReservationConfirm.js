import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReservationConfirm = () => {
  const { id } = useParams(); // Lấy ID đặt chỗ từ URL
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    // Gọi API để lấy chi tiết đặt chỗ
    axios.get(`https://api.yourbackend.com/reservations/${id}`)
      .then(response => setReservation(response.data))
      .catch(error => console.error('Error fetching reservation:', error));
  }, [id]);

  if (!reservation) return <p>Loading...</p>;

  return (
    <div>
      <h1>Chi tiết đặt chỗ</h1>
      <p>Nhà hàng: {reservation.restaurantName}</p>
      <p>Ngày: {reservation.date}</p>
      <p>Giờ: {reservation.time}</p>
      <p>Số người: {reservation.numberOfPeople}</p>
      <p>Trạng thái: {reservation.status}</p>
    </div>
  );
};

export default ReservationConfirm;
