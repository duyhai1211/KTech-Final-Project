package com.example.foodle.review.repository;


import com.example.foodle.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByRestaurantId(Long restaurantId);
    Page<Review> findByRestaurantId(Long restaurantId, Pageable pageable);
    Page<Review> findAllByReviewer_Id(Long userId, Pageable pageable);
}
