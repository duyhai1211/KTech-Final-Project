package com.example.foodle_project.user.mypage.review;

import com.example.foodle_project.restaurant.retaurant.entity.Restaurant;
import com.example.foodle_project.user.model.UserService;
import com.example.foodle_project.user.model.entity.Data;
import com.example.foodle_project.user.model.entity.User;
import com.example.foodle_project.user.mypage.reservation.Reservation;

import com.example.foodle_project.user.mypage.review.entity.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserService userService;
    /*
    TODO
        1. 예약자인지 체크해야 함
        2. 예약상태가 방문완료인 사람인지 체크해야 함
        3. 이미 리뷰를 등록한 사람인지 체크해야 함
     */

    // 내 리뷰
    @Transactional
    public Data<Review> addReview(String content, int rating, Reservation reservation, Long userId) {
        // 1. 유저를 조회하고 권한 확인
        User user = userService.findByIdElseThrow(userId);
        if (!reservation.getUser().getId().equals(user.getId())) {
            return Data.of("F-1", "리뷰작성할 권한이 없습니다.");
        }
        // 2. 예약 상태가 COMPLETED인지 확인
        if (!reservation.getStatus().equals("COMPLETED")) {
            return Data.of("F-1", "방문완료를 한 후에 리뷰작성이 가능합니다.");
        }
        // 3. 이미 리뷰가 작성되었는지 확인
        Optional<Review> opReview = reviewRepository.findByReservationReservationId(reservation.getReservationId());
        if (opReview.isPresent()) {
            return Data.of("F-3", "이미 리뷰를 작성하셨습니다.");
        }
        // 4. 리뷰 생성 및 저장
        Data<Review> review = createAndSave(content, rating, reservation.getRestaurant(), reservation, user.getId());

        return Data.of("S-1", "리뷰가 생성되었습니다.", review.getData());
    }


    public Data<Review> createAndSave(String content, int rating, Restaurant restaurant, Reservation reservation, Long reviewerId) {
        User reviewer = userService.findByIdElseThrow(reviewerId);

        Review review = Review.builder()
                .content(content)
                .rating(rating)
                .reservation(reservation)
                .restaurant(restaurant)
                .reviewer(reviewer)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        reviewRepository.save(review);

        // 식당에게 리뷰가 등록되었다고 알림
        restaurant.addReview(review);
        reservation.setReview(review);

        return Data.of("S-1", "리뷰가 등록되었습니다.");
    }
    public List<Review> findByReviewerId(Long id) {
        return reviewRepository.findByReviewerId(id);
    }

    public Data<List<Review>> getReviews(Long id, int sortCode){

        //로그인 했는지 확인
        if (id != null) {
            List<Review> reviews = findByReviewerId(id);

            Stream<Review> stream = reviews.stream();

            switch (sortCode) {
                case 2:
                    stream = stream.sorted(Comparator.comparing(Review::getId));
                    break;
                case 3:
                    stream = stream.sorted(Comparator.comparing(Review::getRating).reversed());
                    break;
                case 4:
                    stream = stream.sorted(Comparator.comparing(Review::getRating));
                    break;
                default:
                    stream = stream.sorted(Comparator.comparing(Review::getId).reversed());
                    break;

            }
            List<Review> newData = stream.collect(Collectors.toList());

            return Data.of("S-1", "내가 작성한 리뷰들이 정렬되어 출력됩니다.", newData);
        }

        return Data.of("F-1", "먼저 로그인부터 진행해주세요.");
    }

    public Optional<Review> findById(Long id) {
        return reviewRepository.findById(id);
    }

    public Data<Review> canEdit(Long memberId, Long reviewId) {

        Optional<Review> opReview = reviewRepository.findById(reviewId);

        if(opReview.isEmpty()){
            return Data.of("F-1", "리뷰를 수정할 권한이 없습니다.");
        }

        Review review = opReview.get();

        if(memberId != review.getReviewer().getId()){
            return Data.of("F-2", "리뷰를 수정할 권한이 없습니다.");
        }

        return Data.of("S-1", "리뷰수정 가능합니다.", review);
    }

    @Transactional
    public Data edit(Long memberId, Long reviewId, int rating, String content) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다. " + reviewId));

        Data rsData = canEdit(memberId, reviewId);

        if(rsData.isFail())
            return rsData;

        review.setRating(rating);
        review.setContent(content);

        return Data.of("S-1", "리뷰를 수정하였습니다.");
    }

    public Data canDelete(User user, Review review) {
        if (review == null)
            return Data.of("F-1", "이미 삭제되었습니다.");

        if(user.getId() != review.getReviewer().getId())
            return Data.of("F-2", "삭제할 권한이 없습니다.");

        return Data.of("S-1", "삭제가 가능합니다.");
    }

    @Transactional
    public Data delete(Review review) {
        reviewRepository.delete(review);

        return Data.of("S-1", "리뷰를 삭제하였습니다.");
    }

    public List<Review> findReviews(Long restaurantId){
        return reviewRepository.findByRestaurantRestaurantId(restaurantId);
    }

    public double calculateAverageRating(Long restaurantId) {
        List<Review> reviews = findReviews(restaurantId);

        double sum = 0.0;
        for (Review review : reviews) {
            sum += review.getRating();
        }

        if(reviews.size() == 0)
            return 0;

        double average = sum / reviews.size();

        return Math.round(average * 10) / 10.0;
    }

    public int countReviews(Long restaurantId) {
        List<Review> reviews = findReviews(restaurantId);
        return reviews.size();
    }
}