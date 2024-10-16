package com.example.foodle_project.user.mypage.reservation;

import com.example.foodle_project.restaurant.retaurant.entity.Restaurant;
import com.example.foodle_project.user.model.entity.User;
import com.example.foodle_project.user.mypage.review.entity.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @OneToOne(mappedBy = "reservation", fetch = LAZY)
    private Review review;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    private String name;
    private String phone;
    private LocalDate date;
    private LocalTime reservationTime;

    // 예약 수량
    private int partySize;

    // 식당 이름
    private String restaurantName;

    // 예앿 상태
    private String status;

    @Builder
    public Reservation(String name, String phone, LocalDate date, LocalTime reservationTime, int partySize, String status) {
        this.name = name;
        this.phone = phone;
        this.date = date;
        this.reservationTime = reservationTime;
        this.partySize = partySize;
        this.status = status;
    }
    
    public Long getReservationId() {
        return reservationId;
    }



    public Restaurant getRestaurant() {
        return restaurant;
    }

 


    public String getName() {
        return name;
    }

    public String getRestaurantName() {
        return this.restaurantName;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
    }

    public LocalTime getReservationTime() {
        return reservationTime;
    }

    public void setReservationTime(LocalTime reservationTime) {
        this.reservationTime = reservationTime;
    }

    public int getPartySize() {
        return partySize;
    }

    public void setPartySize(int partySize) {
        this.partySize = partySize;
    }



    public void setUser(User user) {
        this.user = user;
        user.getReservations().add(this);
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public void cancelReservation() {
        if (status.equals("저리중")) {
            status = "최소된";
        } else {
            throw new IllegalStateException("Reservation cannot be cancelled.");
        }
    }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }


    public void setReview(Review review) {
        this.review = review;
    }

    public Review getReview() {
        return review;
    }

    public User getUser() {
        return user;
    }


    public void setRestaurant(Restaurant restaurant) {
    }
}
