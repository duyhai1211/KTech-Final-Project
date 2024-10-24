package com.example.foodle.reservation.repository;

import com.example.foodle.reservation.dto.ReservationDto;
import com.example.foodle.reservation.entity.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepo extends JpaRepository<Reservation, Long> {
    Page<Reservation> findAllByUserId(Long userId, Pageable pageable);

}

