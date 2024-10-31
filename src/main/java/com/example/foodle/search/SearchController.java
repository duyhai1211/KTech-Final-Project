package com.example.foodle.search;

import com.example.foodle.restaurant.dto.RestaurantDto;
import com.example.foodle.restaurant.entity.Restaurant;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
public class SearchController {

    private final SearchService restaurantSearchService;



    @GetMapping
    public Page<RestaurantDto> searchRestaurants(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Restaurant.Category category,
            @RequestParam(required = false) Restaurant.Status status,
            @PageableDefault(size = 10) Pageable pageable) { // Thiết lập size mặc định là 10

        return restaurantSearchService.search(keyword, category, status, pageable);
    }


}
