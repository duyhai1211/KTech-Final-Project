import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReservationForm = () => {
  const { id } = useParams(); // Lấy ID nhà hàng từ URL
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    numberOfPeople: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi yêu cầu đặt chỗ
    axios.post(`https://api.yourbackend.com/reservations`, { ...formData, restaurantId: id })
      .then(response => {
        console.log('Đặt chỗ thành công:', response.data);
        // Xử lý sau khi đặt chỗ thành công (redirect hoặc thông báo)
      })
      .catch(error => console.error('Error creating reservation:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đặt chỗ tại nhà hàng</h2>
      <label>
        Ngày:
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </label>
      <label>
        Giờ:
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
      </label>
      <label>
        Số người:
        <input type="number" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleChange} min="1" required />
      </label>
      <button type="submit">Xác nhận</button>
    </form>
  );
};

export default ReservationForm;
