package com.example.foodle_project.user.mypage.review.entity;

import com.example.foodle_project.restaurant.retaurant.entity.Restaurant;
import com.example.foodle_project.user.model.entity.User;
import com.example.foodle_project.user.mypage.reservation.Reservation;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private String content;

    private String nickname;

    private int rating;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne
    private User reviewer;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}