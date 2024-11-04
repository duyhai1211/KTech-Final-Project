package com.example.foodle.reservation.entity;

import com.example.foodle.BaseEntity;
import com.example.foodle.auth.entity.UserEntity;
import com.example.foodle.restaurant.entity.Restaurant;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Setter
public class Reservation extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity user;
    @ManyToOne(fetch = FetchType.LAZY)
    private Restaurant restaurant;
    private String name;
    private String phone;
    private LocalDate date;
    private LocalTime reservationTime;
    // 예약 수량
    private int partySize;

    // 식당 이름
    private String restaurantName;

    // 예앿 상태
    private String status;

    //취소 경우 이유
    private String reason;
}
