package com.example.foodle.reservation.dto;

import com.example.foodle.reservation.entity.Reservation;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    private Long reservationId;
    private String name;
    private String phone;
    private LocalDate date;
    private LocalTime reservationTime;
    private int partySize;
    private Long userId;
    private Long restaurantId;
    private String restaurantName;
    private String status;
    private String reason;

    public static ReservationDto fromEntity(Reservation entity) {
        return ReservationDto.builder()
                .reservationId(entity.getId())
                .userId(entity.getUser().getId())
                .restaurantId(entity.getRestaurant().getId())
                .restaurantName(entity.getRestaurant().getName())
                .name(entity.getName())
                .phone(entity.getPhone())
                .date(entity.getDate())
                .reservationTime(entity.getReservationTime())
                .partySize(entity.getPartySize())
                .status(entity.getStatus())
                .reason(entity.getReason())
                .build();
    }
}
