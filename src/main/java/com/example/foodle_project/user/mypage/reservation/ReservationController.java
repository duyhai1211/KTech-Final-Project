package com.example.foodle_project.user.mypage.reservation;

import com.example.foodle_project.base.Rq;
import com.example.foodle_project.user.model.repo.UserRepository;
import com.example.foodle_project.user.mypage.reservation.dto.ReservationRequestDto;
import com.example.foodle_project.user.mypage.reservation.dto.ReservationDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/reservation")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;
    private final UserRepository userRepository;
    private final Rq rq;

    // 예약 생성
    @PostMapping("check")
    public ResponseEntity<Long> createReservation(@Valid @RequestBody ReservationRequestDto reservationDto) {
        Long reservationId = reservationService.createReservation(reservationDto);
        return new ResponseEntity<>(reservationId, HttpStatus.CREATED);
    }



    // 특정 예약 조회
    @GetMapping("/{id}")
    public ResponseEntity<ReservationDto> getReservationById(@PathVariable Long id) {
        ReservationDto reservationDto = reservationService.getReservationById(id);
        return new ResponseEntity<>(reservationDto, HttpStatus.OK);
    }

    // 사용자의 예약 목록 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationDto>> getReservationsByMemberId(@PathVariable Long userId) {
        List<ReservationDto> reservations = reservationService.getReservationsByMemberId(userId);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    // 예약 취소
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.noContent().build();
    }


    // 예약 확인
    @PutMapping("/{id}/confirm")
    public ResponseEntity<Void> confirmReservation(@PathVariable Long id) {
        reservationService.confirmReservation(id);
        return ResponseEntity.noContent().build();
    }

    // 예약 완료 처리
    @PutMapping("/{id}/complete")
    public ResponseEntity<Void> completeReservation(@PathVariable Long id) {
        reservationService.completeReservation(id);
        return ResponseEntity.noContent().build();
    }

    // 예약 삭제
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
}