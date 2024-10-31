package com.example.foodle.search;

import com.example.foodle.restaurant.dto.RestaurantDto;
import com.example.foodle.restaurant.entity.Restaurant;
import com.example.foodle.restaurant.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Service
@RequiredArgsConstructor
public class SearchService {

    private final RestaurantRepository restaurantRepository;



    public Page<RestaurantDto> search(String keyword, Restaurant.Category category, Restaurant.Status status, Pageable pageable) {
        Page<Restaurant> resultPage;
        if (keyword == null || keyword.isEmpty()) {
            return new PageImpl<>(Collections.emptyList(), pageable, 0); // Trả về danh sách rỗng
        }
        if (category != null && status != null) {
            resultPage = restaurantRepository.findByCategoryAndStatus(category, status, pageable);
        } else if (keyword != null) {
            resultPage = restaurantRepository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                    keyword, keyword, keyword, pageable);
        } else {
            resultPage = restaurantRepository.findAll(pageable);
        }

        return resultPage.map(RestaurantDto::fromEntity);

    }



}
