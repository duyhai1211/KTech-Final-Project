package com.example.foodle.restaurant.repository;

import com.example.foodle.auth.entity.UserEntity;
import com.example.foodle.restaurant.entity.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Optional<Restaurant> findByOwner(UserEntity owner);
    Page<Restaurant> findAll(Pageable pageable);
    // Tìm kiếm theo từ khóa
    Page<Restaurant> findByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String name, String address, String description, Pageable pageable);

    // Tìm kiếm theo category và status
    Page<Restaurant> findByCategoryAndStatus(Restaurant.Category category, Restaurant.Status status, Pageable pageable);

}

