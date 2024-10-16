package com.example.foodle_project.user.mypage.reservation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByUserId(Long userId);
//    List<Reservation> findAllByMemberIdOrderByDateDesc(Long userId);
//    Optional<Reservation> findByReservationId(Long reservationId);

}
