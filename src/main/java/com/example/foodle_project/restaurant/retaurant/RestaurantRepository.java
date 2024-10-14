package com.example.foodle_project.restaurant.retaurant;


import com.example.foodle_project.restaurant.address.entity.Address;
import com.example.foodle_project.restaurant.retaurant.entity.Restaurant;
import com.example.foodle_project.user.mypage.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Page<Restaurant> findByAddressIn(List<Address> addressList, Pageable pageable);

    List<Review> findByRestaurantId(Long id);
}