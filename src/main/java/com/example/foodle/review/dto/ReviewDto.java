package com.example.foodle.review.dto;


import com.example.foodle.auth.entity.UserEntity;
import com.example.foodle.review.entity.Review;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Builder
public class ReviewDto {
    private Long id;           // 리뷰 ID
    private String content;    // 리뷰 내용
    private String nickname;   // 리뷰어 닉네임
    private int rating;        // 리뷰 평점
    private Long reservationId; // 예약 ID
    private Long restaurantId;  // 식당 ID
    private String restaurantName;
    private LocalDateTime createdAt; // 생성일
    private LocalDateTime updatedAt; // 수정일
    private UserEntity reviewer;


    // 엔티티에서 DTO로 변환하는 정적 메서드
    public static ReviewDto fromEntity(Review review) {
        return ReviewDto.builder()
                .id(review.getId())
                .content(review.getContent())
                .nickname(review.getNickname())
                .rating(review.getRating())
                .reservationId(review.getReservation().getId())
                .restaurantId(review.getRestaurant().getId())
                .restaurantName(review.getRestaurant().getName())
                .reviewer(review.getReviewer()) // 리뷰어 정보 추가
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();
    }


}