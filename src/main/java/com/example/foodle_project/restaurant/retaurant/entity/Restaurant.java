package com.example.foodle_project.restaurant.retaurant.entity;

import com.example.foodle_project.restaurant.address.entity.Address;
import com.example.foodle_project.restaurant.image.RestaurantImage;
import com.example.foodle_project.restaurant.menu.entity.Menu;
import com.example.foodle_project.restaurant.retaurant.dto.RestaurantDto;
import com.example.foodle_project.user.mypage.reservation.Reservation;
import com.example.foodle_project.user.mypage.review.entity.Review;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "restaurants") // 테이블 이름 정의
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long restaurantId;

    private String restaurantName;

    private String description;

    @Enumerated(EnumType.STRING)
    private RestaurantType type;

    private String phoneNumber;


    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;


    private LocalTime openingTime;
    private LocalTime closingTime;


    @OneToOne(mappedBy = "restaurant", orphanRemoval = true)
    private RestaurantImage restaurantImage;

    public void setProfileImage(String fileName) {
    }


    public enum Status {
        PREPARING, OPEN, CLOSED
    }

    @OneToMany(mappedBy = "restaurant", orphanRemoval = true)
    private List<Menu> menuList = new ArrayList<>();

    @OneToMany(mappedBy = "restaurant", orphanRemoval = true)
    private List<Reservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "restaurant", orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    public void addReview(Review review) {
        reviews.add(0, review);
    }


    @Builder
    public Restaurant(String restaurantName, String description, RestaurantType type, String phoneNumber,
                      Address address, LocalTime openingTime, LocalTime closingTime) {
        this.restaurantName = restaurantName;
        this.description = description;
        this.type = type;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
    }

    //  식당 update 데이터
    public void update(
            RestaurantDto restaurantDto,
            Address address,
            LocalTime startTime,
            LocalTime endTime
    ) {
        restaurantName = restaurantDto.getRestaurantName();
        description = restaurantDto.getDescription();
        phoneNumber = restaurantDto.getPhoneNumber();
        this.address = address;
        type = RestaurantType.valueOf(restaurantDto.getType());
        openingTime = startTime;
        closingTime = endTime;
    }

}