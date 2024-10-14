package com.example.foodle_project.restaurant.retaurant.entity;

import com.example.foodle_project.restaurant.image.RestaurantImage;
import com.example.foodle_project.restaurant.retaurant.dto.RestaurantUpdateDto;
import com.example.foodle_project.user.mypage.reservation.Reservation;
import com.example.foodle_project.user.mypage.review.entity.Review;
import com.nimbusds.openid.connect.sdk.claims.Address;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.awt.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
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

    private String detail_address;

    private LocalTime openingTime;
    private LocalTime closingTime;

    @OneToOne(mappedBy = "restaurant", orphanRemoval = true)
    private RestaurantImage restaurantImage;

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
                      Address address, String detail_address, LocalTime openingTime, LocalTime closingTime) {
        this.restaurantName = restaurantName;
        this.description = description;
        this.type = type;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.detail_address = detail_address;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
    }


    public RestaurantUpdateDto toRestaurantUpdateDto() {
        RestaurantUpdateDto restaurantUpdateDto = new RestaurantUpdateDto();
        restaurantUpdateDto.setRestaurantName(restaurantName);
        restaurantUpdateDto.setDescription(description);
        restaurantUpdateDto.setPhoneNumber(phoneNumber);
        restaurantUpdateDto.setAddress1(address.getAddress1());
        restaurantUpdateDto.setAddress2(address.getAddress2());
        restaurantUpdateDto.setAddress3(address.getAddress3());
        restaurantUpdateDto.setDetail_address(detail_address);
        restaurantUpdateDto.setType(type.name());
        restaurantUpdateDto.setStartTime(openingTime.toString());
        restaurantUpdateDto.setEndTime(closingTime.toString());

        return restaurantUpdateDto;
    }

    public void update(RestaurantUpdateDto restaurantUpdateDto, Address address, LocalTime startTime, LocalTime endTime) {
        restaurantName = restaurantUpdateDto.getRestaurantName();
        description = restaurantUpdateDto.getDescription();
        phoneNumber = restaurantUpdateDto.getPhoneNumber();
        this.address = address;
        detail_address = restaurantUpdateDto.getDetail_address();
        type = RestaurantType.valueOf(restaurantUpdateDto.getType());
        openingTime = startTime;
        closingTime = endTime;
    }


}

