package com.example.foodle.reservation;

import com.example.foodle.reservation.dto.ReservationDto;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;



@RestController
@RequiredArgsConstructor
@RequestMapping("/reservation")
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping("/create")
    public ReservationDto createReservation(@RequestBody ReservationDto reservation, @RequestParam Long restaurantId  ) {
        return reservationService.createReservation(reservation,restaurantId);
    }
    @GetMapping("/user")
    public Page<ReservationDto> getReservationsForUser(Pageable pageable) {
        return reservationService.myReservation(pageable);
    }
    @GetMapping("/restaurant")
    public Page<ReservationDto> getReservationsForRes(Pageable pageable) {
        return reservationService.myReservations(pageable);
    }
    @PostMapping("/restaurant/{reservationId}/complete")
    public ReservationDto completeReservationRes(@PathVariable Long reservationId) {
        return reservationService.completeReservation(reservationId);
    }
    @PostMapping("/user/{reservationId}/complete")
    public ReservationDto completeReservationUser(@PathVariable Long reservationId) {
        return reservationService.completeReservation(reservationId);
    }
    @PostMapping("/restaurant/{reservationId}/confirm")
    public ReservationDto confirmReservation(@PathVariable Long reservationId) {
        return reservationService.confirmReservation(reservationId);
    }
    @PostMapping("/restaurant/{reservationId}/cancel")
    public ReservationDto cancelReservationRes(@PathVariable Long reservationId, @RequestBody String reason) {
        return reservationService.cancelReservation(reservationId,reason);

    }
    @PostMapping("/user/{reservationId}/cancel")
    public ReservationDto cancelReservationUser(@PathVariable Long reservationId, @RequestBody String reason) {
        return reservationService.cancelReservation(reservationId,reason);
    }
//
//    // Trang tạo mới đặt chỗ cho người dùng
//    @GetMapping("/reservation/create")
//    public String createReservationPage() {
//        return "reservation/create"; // Điều hướng đến templates/reservation/create.html
//    }
//
//    // Trang danh sách đặt chỗ cho người dùng
//    @GetMapping("/reservation/user")
//    public String userReservationsPage() {
//        return "reservation/userReservations"; // Điều hướng đến templates/reservation/userReservations.html
//    }
//
//    // Trang danh sách đặt chỗ cho nhà hàng
//    @GetMapping("/reservation/restaurant")
//    public String restaurantReservationsPage() {
//        return "reservation/restaurantReservations"; // Điều hướng đến templates/reservation/restaurantReservations.html
//    }
//
//    // Trang hoàn tất đặt chỗ dành cho nhà hàng
//    @GetMapping("/reservation/restaurant/complete")
//    public String completeReservationPage() {
//        return "reservation/complete"; // Điều hướng đến templates/reservation/complete.html
//    }
//
//    // Trang xác nhận đặt chỗ dành cho nhà hàng
//    @GetMapping("/reservation/restaurant/confirm")
//    public String confirmReservationPage() {
//        return "reservation/confirm"; // Điều hướng đến templates/reservation/confirm.html
//    }
//
//    // Trang hủy đặt chỗ dành cho nhà hàng
//    @GetMapping("/reservation/restaurant/cancel")
//    public String cancelReservationResPage() {
//        return "reservation/cancel"; // Điều hướng đến templates/reservation/cancel.html
//    }
//
//    // Trang hủy đặt chỗ dành cho người dùng
//    @GetMapping("/reservation/user/cancel")
//    public String cancelReservationUserPage() {
//        return "reservation/cancelUser"; // Điều hướng đến templates/reservation/cancelUser.html
//    }

}
