package com.example.foodle.menu.repository;

import com.example.foodle.menu.entity.Menu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepo extends JpaRepository<Menu, Long> {
    Page<Menu> findAllByRestaurantId(Long restaurantId, Pageable pageable);
}
