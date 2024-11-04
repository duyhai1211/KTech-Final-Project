package com.example.foodle.review.dto;

import com.example.foodle.review.entity.Review;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Setter
@Getter
@Builder
public class ReviewViewDto {
    private Long id;           // 리뷰 ID
    private String content;    // 리뷰 내용
    private String nickname;   // 리뷰어 닉네임
    private int rating;
    private LocalDateTime createdAt; // 생성일
    private LocalDateTime updatedAt;
    private Long reservationId; // 예약 ID
    private Long restaurantId;
    private String restaurantName;

    public static ReviewViewDto fromEntity(Review review) {
        return ReviewViewDto.builder()
                .id(review.getId())
                .content(review.getContent())
                .nickname(review.getNickname())
                .rating(review.getRating())
                .restaurantName(review.getRestaurant().getName())
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();
    }

}
