package com.example.foodle_project.restaurant.retaurant.repo;


import com.example.foodle_project.restaurant.address.entity.Address;
import com.example.foodle_project.restaurant.retaurant.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    // Tìm nhà hàng theo tên
    Optional<Restaurant> findByRestaurantName(String restaurantName);

    // Tìm nhà hàng theo địa chỉ cụ thể
    List<Restaurant> findByAddress(Address address);

    // Tìm tất cả nhà hàng có type là "OPEN"
    List<Restaurant> findByType(Restaurant.Status status);

    // Tìm kiếm nhà hàng theo từ khóa tên hoặc mô tả
    @Query("SELECT r FROM Restaurant r WHERE r.restaurantName LIKE %:keyword% OR r.description LIKE %:keyword%")
    List<Restaurant> searchByKeyword(@Param("keyword") String keyword);
}