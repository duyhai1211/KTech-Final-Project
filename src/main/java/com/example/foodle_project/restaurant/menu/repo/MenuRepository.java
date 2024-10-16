package com.example.foodle_project.restaurant.menu.repo;

import com.example.foodle_project.restaurant.menu.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
