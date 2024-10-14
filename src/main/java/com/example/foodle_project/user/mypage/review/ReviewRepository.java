package com.example.foodle_project.user.mypage.review;


import com.example.foodle_project.user.mypage.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByReviewerId(Long reviewerId);

    Optional<Review> findByReservationReservationId(Long reservationId);

    List<Review> findByRestaurantRestaurantId(Long restaurantId);
}
