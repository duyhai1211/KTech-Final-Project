package com.example.foodle.menu.entity;

import com.example.foodle.BaseEntity;
import com.example.foodle.restaurant.entity.Restaurant;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Menu extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    private Restaurant restaurant;
    private String name;
    private String img;
    private String description;
    private Integer price;

}
