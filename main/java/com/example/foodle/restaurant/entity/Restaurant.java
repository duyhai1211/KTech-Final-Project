package com.example.foodle.restaurant.entity;

import com.example.foodle.BaseEntity;
import com.example.foodle.auth.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
public class Restaurant extends BaseEntity {


    @Setter
    @OneToOne(fetch = FetchType.LAZY)
    private UserEntity owner;

    @Setter
    //@Column(nullable = false)
    private String name;

    @Setter
    //@Column(nullable = false)
    private String address;

    @Setter
    @Column
    private Integer capacity;
    @Setter
    private String phoneNumber;
    @Setter
    private String description;

    @Setter
    @Enumerated(EnumType.STRING)
    private Category category;

    @Setter
    @Enumerated(EnumType.STRING)
    private Status status;
    @Setter
    @Column
    private String registrationNum;

    @Setter
    private String profileImage;

    @Setter
    private String closeReason;
    @Setter
    private LocalTime openTime;
    @Setter//w
    private LocalTime closeTime;
    @OneToMany(mappedBy = "restaurant", fetch = FetchType.EAGER)
    private List<OpenRequest> openRequest = new ArrayList<>();
    public enum Category {
        JAP, WESTERN,CHINA,PIZZA,CHICKEN
    }

    public enum Status {
        PREPARING, OPEN, CLOSED, PENDING, APPROVED, REJECTED
    }


}
