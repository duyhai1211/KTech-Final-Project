package com.example.foodle.reservation;

import com.example.foodle.reservation.dto.ReservationDto;
import com.example.foodle.reservation.entity.Reservation;
import com.example.foodle.restaurant.dto.RestaurantDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reservation")
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping
    public ReservationDto createReservation(@RequestBody ReservationDto reservation, @RequestParam Long restaurantId  ) {
        return reservationService.createReservation(reservation,restaurantId);
    }
    @GetMapping("/user")
    public Page<ReservationDto> getReservationsForUser(Pageable pageable) {
        return reservationService.myReservation(pageable);
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
    public ReservationDto cancelReservationRes(@PathVariable Long reservationId, @RequestParam String reason) {
        return reservationService.cancelReservation(reservationId, reason);

    }
    @PostMapping("/user/{reservationId}/cancel")
    public ReservationDto cancelReservationUser(@PathVariable Long reservationId,@RequestParam String reason) {
        return reservationService.cancelReservation(reservationId, reason);
    }


}
