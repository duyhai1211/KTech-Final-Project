import React from 'react';
import { useEffect } from 'react';

const CalendarIntegration = ({ reservation }) => {
  
  useEffect(() => {
    // Tích hợp Google Calendar hoặc Naver Calendar bằng API của họ.
    const addToCalendar = () => {
      const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${reservation.restaurantName}&dates=${reservation.dateTime}&details=Số người: ${reservation.numberOfPeople}&location=${reservation.restaurantAddress}`;
      window.open(calendarUrl, '_blank');
    };

    addToCalendar();
  }, [reservation]);

  return (
    <div>
      <p>Đã thêm đặt chỗ vào lịch.</p>
    </div>
  );
};

export default CalendarIntegration;
