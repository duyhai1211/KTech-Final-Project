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


}
