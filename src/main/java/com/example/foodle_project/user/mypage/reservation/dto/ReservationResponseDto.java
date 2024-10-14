package com.example.foodle_project.user.mypage.reservation.dto;

import com.example.foodle_project.user.mypage.review.entity.Review;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ReservationResponseDto {
    private Long reservationId;
    private String name;
    private String phone;
    private LocalDate date;
    private LocalTime reservationTime;
    private int partySize;
    private Long memberId;
    private Long restaurantId;
    private String restaurantName;
    private String status;
    private boolean hasReview;
    private Review review;
}