package com.example.foodle_project.user.mypage.reservation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByMemberId(Long memberId);

    List<Reservation> findAllByMemberIdOrderByDateDesc(Long member_id);

    Optional<Reservation> findByReservationId(Long reservationId);
}
