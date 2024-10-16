package com.example.foodle_project.restaurant.retaurant.dto;

import com.example.foodle_project.restaurant.address.entity.Address;
import com.example.foodle_project.restaurant.retaurant.entity.Restaurant;
import com.example.foodle_project.restaurant.retaurant.entity.RestaurantType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class RestaurantDto {

    private Long restaurantId;
    private String restaurantName;
    private String description;
    private String type; // Sử dụng String cho loại RestaurantType (OPEN, CLOSED, PREPARING)
    private String phoneNumber;
    private String address1; // Address cấp 1
    private String address2; // Address cấp 2
    private String address3; // Address cấp 3
    private String detailAddress; // Địa chỉ chi tiết
    private String openingTime;
    private String closingTime;

    // Constructors
    public RestaurantDto() {}

    public RestaurantDto(Long restaurantId, String restaurantName, String description, String type, String phoneNumber,
                         String address1, String address2, String address3, String detailAddress,
                         String openingTime, String closingTime) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.description = description;
        this.type = type;
        this.phoneNumber = phoneNumber;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
        this.detailAddress = detailAddress;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
    }

    // Getters and Setters
    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getAddress3() {
        return address3;
    }

    public void setAddress3(String address3) {
        this.address3 = address3;
    }

    public String getDetailAddress() {
        return detailAddress;
    }

    public void setDetailAddress(String detailAddress) {
        this.detailAddress = detailAddress;
    }

    public String getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(String openingTime) {
        this.openingTime = openingTime;
    }

    public String getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(String closingTime) {
        this.closingTime = closingTime;
    }
}
