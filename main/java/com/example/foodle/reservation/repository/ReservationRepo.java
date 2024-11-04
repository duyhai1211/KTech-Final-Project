package com.example.foodle.reservation.repository;


import com.example.foodle.reservation.entity.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



public interface ReservationRepo extends JpaRepository<Reservation, Long> {
    Page<Reservation> findAllByUserId(Long userId, Pageable pageable);
    Page<Reservation> findAllByRestaurantId(Long restaurantId, Pageable pageable);

}

