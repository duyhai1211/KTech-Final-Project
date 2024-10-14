package com.example.foodle_project.user.mypage.reservation.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public class ReservationRequestDto {

    @NotBlank
    private String name;
    @NotBlank
    private String phone;
    @Future
    @NotNull
    private LocalDate date;
    @NotNull
    private LocalTime reservationTime;
    @NotNull
    private int partySize;
    @NotNull
    private Long userId;
    @NotNull
    private Long restaurantId;
    @NotBlank
    private String restaurantName;

    private String status;

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getReservationTime() {
        return reservationTime;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public int getPartySize() {
        return partySize;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public String getStatus() { return status; }

    // Setter 메서드
    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setReservationTime(LocalTime reservationTime) {
        this.reservationTime = reservationTime;
    }

    public void setPartySize(int partySize) {
        this.partySize = partySize;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public void setStatus(String status) { this.status = status; }
}
