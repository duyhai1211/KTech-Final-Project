package com.example.foodle_project.restaurant.retaurant;

import com.example.foodle_project.restaurant.address.AddressService;
import com.example.foodle_project.restaurant.menu.dto.MenuDto;
import com.example.foodle_project.restaurant.retaurant.dto.RestaurantDto;
import com.example.foodle_project.restaurant.retaurant.entity.Restaurant;
import com.example.foodle_project.user.mypage.reservation.Reservation;
import com.example.foodle_project.user.mypage.review.ReviewService;
import com.example.foodle_project.user.mypage.review.entity.Review;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/restaurant")
public class RestaurantController {
    private final RestaurantService restaurantService;
    private final ReviewService reviewService;
    private final AddressService addressService;


    // tao nha hang moi
    @PostMapping("/create")
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody RestaurantDto restaurantDto) {
        Restaurant createdRestaurant = restaurantService.createRestaurant(restaurantDto);
        return new ResponseEntity<>(createdRestaurant, HttpStatus.CREATED); // Trả về HTTP 201 Created
    }

    // update
    @PutMapping("/{restaurantId}")
    public ResponseEntity<RestaurantDto> updateRestaurant(@PathVariable("id") Long restaurantId, @RequestBody RestaurantDto restaurantDto) {
        RestaurantDto updatedRestaurant = restaurantService.updateRestaurant(restaurantId, restaurantDto);
        return ResponseEntity.ok(updatedRestaurant);
    }

    @GetMapping("/{restaurantId}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable("id") Long restaurantId) {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
        return ResponseEntity.ok(restaurant);
    }

    // Tìm tất cả đánh giá của một nhà hàng
    @GetMapping("/{restaurantId}/reviews")
    public ResponseEntity<List<Review>> getReviews(@PathVariable("id") Long restaurantId) {
        List<Review> reviews = restaurantService.getReviews(restaurantId);
        return ResponseEntity.ok(reviews); // Trả về HTTP 200 OK
    }

    // Tìm tất cả đặt chỗ của nhà hàng
    @GetMapping("/{restaurantId}/reservations")
    public ResponseEntity<List<Reservation>> getReservations(@PathVariable("id") Long restaurantId) {
        List<Reservation> reservations = restaurantService.getReservations(restaurantId);
        return ResponseEntity.ok(reservations); // Trả về HTTP 200 OK
    }


    // Tải lên hình ảnh cho nhà hàng
    @PostMapping("/{restaurantId}/image")
    public ResponseEntity<String> updateRestaurantImage(@PathVariable Long restaurantId, @RequestParam MultipartFile file) {
        try {
            String fileName = restaurantService.updateRestaurantImage(restaurantId, file);
            return ResponseEntity.ok("Hình ảnh đã được cập nhật: " + fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi cập nhật hình ảnh: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Thêm menu cho nhà hàng
    @PostMapping("/{restaurantId}/menu")
    public ResponseEntity<Long> addMenuToRestaurant(@PathVariable("id") Long restaurantId, @RequestBody MenuDto menuDto) {
        Long menuId = restaurantService.addMenuToRestaurant(restaurantId, menuDto);
        return new ResponseEntity<>(menuId, HttpStatus.CREATED); // Trả về HTTP 201 Created
    }








}
