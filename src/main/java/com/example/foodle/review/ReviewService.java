package com.example.foodle.review;

import com.example.foodle.auth.AuthenticationFacade;
import com.example.foodle.auth.entity.UserEntity;
import com.example.foodle.reservation.entity.Reservation;
import com.example.foodle.reservation.repository.ReservationRepo;
import com.example.foodle.restaurant.entity.Restaurant;
import com.example.foodle.restaurant.repository.RestaurantRepository;
import com.example.foodle.review.dto.ReviewDto;
import com.example.foodle.review.dto.ReviewViewDto;
import com.example.foodle.review.entity.Review;
import com.example.foodle.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReservationRepo reservationRepository;
    private final AuthenticationFacade facade;
    private final RestaurantRepository restaurantRepository;

    @Transactional
    public Long createReview(Long reservationId, ReviewDto reviewDto) {
        UserEntity reviewer = facade.extractUser();

        // 예약 조희
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new NoSuchElementException("예약을 찾을 수 없습니다: " + reservationId));

        if (reviewer == null) {
            throw new IllegalArgumentException("리뷰어 정보가 필요합니다.");
        }
        String restaurantName = reservation.getRestaurant().getName();
        // 리뷰 생성
        Review review = Review.builder()
                .content(reviewDto.getContent())
                .nickname(reviewer.getNickname())
                .rating(reviewDto.getRating())
                .reservation(reservation)
                .restaurant(reservation.getRestaurant())
                .reviewer(reviewer) // 리뷰어 정보 설정
                .build();

        // 리뷰 저장
        Review savedReview = reviewRepository.save(review);
        reviewDto.setRestaurantName(restaurantName);
        System.out.println("Created At: " + savedReview.getCreatedAt());
        System.out.println("Updated At: " + savedReview.getUpdatedAt());

        return savedReview.getId();
    }
    public ReviewViewDto getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다: " + id));

        return ReviewViewDto.fromEntity(review);
    }

    // 특정 식당의 모든 리뷰 조회
    public List<ReviewViewDto> getReviewsByRestaurantId(Long restaurantId) {
        List<Review> reviews = reviewRepository.findByRestaurantId(restaurantId);
        return reviews.stream()
                .map(ReviewViewDto::fromEntity)
                .toList();
    }

    //owner 모든 리뷰
    public Page<ReviewViewDto> getReviewsByRestaurant(Pageable pageable) {
        UserEntity owner = facade.extractUser();
        Restaurant restaurant = restaurantRepository.findByOwner(owner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR));
        return reviewRepository.findByRestaurantId(restaurant.getId(),pageable)
                .map(ReviewViewDto::fromEntity);
    }
    //user
    public Page<ReviewViewDto> getReviewsByUser(Pageable pageable) {
        UserEntity user = facade.extractUser();
        return reviewRepository.findAllByReviewer_Id(user.getId(), pageable)
                .map(ReviewViewDto::fromEntity);
    }
    // 리뷰 수정
    @Transactional
    public void updateReview(Long id, ReviewDto reviewDto) {
        UserEntity currentUser = facade.extractUser();

        // Lấy đánh giá và kiểm tra quyền sở hữu
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다: " + id));

        if (!review.getReviewer().getId().equals(currentUser.getId())) {
            throw new SecurityException("현재 사용자에게 리뷰 수정 권한이 없습니다.");
        }

        // Cập nhật nội dung đánh giá
        review.setContent(reviewDto.getContent());
        review.setRating(reviewDto.getRating());
        reviewRepository.save(review);
    }

    // 리뷰 삭제
    @Transactional
    public void deleteReview(Long id) {
        UserEntity currentUser = facade.extractUser();

        // Lấy đánh giá và kiểm tra quyền sở hữu
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다: " + id));

        if (!review.getReviewer().getId().equals(currentUser.getId())) {
            throw new SecurityException("현재 사용자에게 리뷰 삭제 권한이 없습니다.");
        }

        reviewRepository.delete(review);
    }
}
