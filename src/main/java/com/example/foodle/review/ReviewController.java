package com.example.foodle.review;

import com.example.foodle.review.dto.ReviewDto;
import com.example.foodle.review.dto.ReviewViewDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    //tao review
    @PostMapping("/users/review/{reservationId}")
    public ResponseEntity<Long> createReview(@PathVariable Long reservationId, @RequestBody ReviewDto reviewDto) {
        Long reviewId = reviewService.createReview(reservationId, reviewDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewId);
    }
    // 특정 식당의 모든 리뷰 조회
    @GetMapping("/review/restaurant/{restaurantId}")
    public ResponseEntity<List<ReviewViewDto>> getReviewsByRestaurantId(@PathVariable Long restaurantId) {
        List<ReviewViewDto> reviews = reviewService.getReviewsByRestaurantId(restaurantId);
        return ResponseEntity.ok(reviews);
    }
    //xem từng cái review
    @GetMapping("/users/review/{reviewId}")
    public ResponseEntity<ReviewViewDto> getReviewById(@PathVariable Long reviewId) {
        ReviewViewDto reviewDto = reviewService.getReviewById(reviewId);
        log.info("loi 1");
        return ResponseEntity.ok(reviewDto);
    }
    //tất cả review đã nhận của chủ nhà hàng
    @GetMapping("/restaurant/review")
    public Page<ReviewViewDto> myRestaurantReview(Pageable pageable) {
        return reviewService.getReviewsByRestaurant(pageable);
    }
    //tất cả review đã viết của ng dùng
    @GetMapping("/users/review")
    public Page<ReviewViewDto> myUserReview(Pageable pageable) {
        return reviewService.getReviewsByUser(pageable);
    }
    //update review
    @PutMapping("/users/review/{id}")
    public ResponseEntity<Void> updateReview(@PathVariable Long id, @RequestBody ReviewDto reviewDto) {
        reviewService.updateReview(id, reviewDto);
        return ResponseEntity.noContent().build();
    }
    //xoa review
    @DeleteMapping("/users/review/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
