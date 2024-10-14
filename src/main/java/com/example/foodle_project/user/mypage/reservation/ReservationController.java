package com.example.foodle_project.user.mypage.reservation;

import com.example.foodle_project.base.Rq;
import com.example.foodle_project.restaurant.retaurant.RestaurantRepository;
import com.example.foodle_project.user.model.entity.Data;
import com.example.foodle_project.user.model.entity.User;
import com.example.foodle_project.user.model.repo.UserRepository;
import com.example.foodle_project.user.mypage.reservation.dto.ReservationRequestDto;
import com.example.foodle_project.user.mypage.reservation.dto.ReservationResponseDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Controller
@RequestMapping("/reservation")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;
    private final Rq rq;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;


    @PreAuthorize("isAuthenticated()")
    @PostMapping("/check")
    @ResponseBody
    @Transactional
    public Data<Long> createReservation(@RequestBody ReservationRequestDto reservationDto) {
        if (rq.isLogin()) {
            String loggedInUserId = rq.getUser().getUsername();
            User loggedInMember = userRepository.findByUsername(loggedInUserId).orElse(null);
            Long restaurantId = reservationDto.getRestaurantId();
            String restaurantName = reservationDto.getRestaurantName();
            if (loggedInMember != null && restaurantId != null && restaurantRepository.existsById(restaurantId)) {
                reservationDto.setUserId(loggedInMember.getId());
                reservationDto.setRestaurantName(restaurantName);
                Long reservationId = reservationService.createReservation(reservationDto);
                return Data.of("S-1", "예약에 성공하셨습니다.", reservationId);
            }
        }
        return Data.of("F-1", "예약에 실패하셨습니다.");
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/check")
    public String showReservationCheckPage(Model model, @RequestParam(required = false) String sort) {
        if (rq.isLogin()) {
            String loggedInUserId = rq.getUser().getUsername();
            User loggedInMember = userRepository.findByUsername(loggedInUserId).orElse(null);
            if (loggedInMember != null) {
                List<ReservationResponseDto> reservationList = reservationService.getReservationsByMemberId(loggedInMember.getId());

                // 선택한 정렬 옵션에 따라 목록을 정렬
                if ("asc".equals(sort)) {
                    // 예약 날짜 오름차순
                    reservationList.sort(Comparator.comparing(ReservationResponseDto::getDate).thenComparing(ReservationResponseDto::getReservationTime));
                } else if ("desc".equals(sort)) {
                    // 예약 날짜 내림차순
                    reservationList.sort(Comparator.comparing(ReservationResponseDto::getDate).thenComparing(ReservationResponseDto::getReservationTime).reversed());
                } else {
                    // 기본 정렬: 현재 시간과 가장 가까운 예약부터 보여주되, 이미 지난 예약은 뒤로 미룸
                    LocalDateTime now = LocalDateTime.now();
                    reservationList.sort((r1, r2) -> {
                        LocalDateTime d1 = r1.getDate().atTime(r1.getReservationTime());
                        LocalDateTime d2 = r2.getDate().atTime(r2.getReservationTime());

                        boolean isR1Past = d1.isBefore(now);
                        boolean isR2Past = d2.isBefore(now);

                        if (isR1Past && !isR2Past) {
                            return 1; // r1이 과거이고 r2가 아니면, r1을 뒤로 보냄
                        } else if (!isR1Past && isR2Past) {
                            return -1; // r1이 과거가 아니고 r2가 과거면, r2를 뒤로 보냄
                        } else {
                            // 두 예약이 모두 과거이거나 모두 과거가 아니면, 시간이 더 가까운 것을 앞으로 보냄
                            return d1.compareTo(d2);
                        }
                    });
                }

                model.addAttribute("reservations", reservationList);
            }
        }
        return "usr/reservation/check";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<ReservationResponseDto>> getUserReservations(@PathVariable Long id) {
        List<ReservationResponseDto> responseDtoList = reservationService.getReservationsByMemberId(id);
        return ResponseEntity.ok(responseDtoList);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<Void> completeReservation(@PathVariable Long id) {
        reservationService.completeReservation(id);
        return ResponseEntity.noContent().build();
    }
}



