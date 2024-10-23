package com.example.foodle_project.auth.mypage.review.entity;


import com.example.foodle_project.auth.entity.UserEntity;
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
                .reservationId(review.getReservation().getReservationId())
                .restaurantId(review.getRestaurant().getId())
                .reviewer(review.getReviewer()) // 리뷰어 정보 추가
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();
    }


}