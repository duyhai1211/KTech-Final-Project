package com.example.foodle.review.entity;


import com.example.foodle.BaseEntity;
import com.example.foodle.auth.entity.UserEntity;
import com.example.foodle.reservation.entity.Reservation;
import com.example.foodle.restaurant.entity.Restaurant;

import jakarta.persistence.*;
import lombok.*;


import static jakarta.persistence.FetchType.LAZY;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review  extends BaseEntity {




    private String content;

    private String nickname;

    private int rating;

    @OneToOne(fetch = LAZY)
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Reservation reservation;

    @ManyToOne(fetch = LAZY)
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Restaurant restaurant;

    @ManyToOne(fetch = LAZY)
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private UserEntity reviewer;



}