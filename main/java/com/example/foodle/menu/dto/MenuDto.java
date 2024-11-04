package com.example.foodle.menu.dto;

import com.example.foodle.menu.entity.Menu;
import com.example.foodle.restaurant.dto.RestaurantDto;
import lombok.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;
@Data
@Builder
public class MenuDto {

    private Long id;
    @NotBlank(message = "메뉴 이름을 입력해주세요.")
    private String name;
    private String description;
    private String img;
    @Range(min = 500, max = 1000000, message = "메뉴 가격은 500원 ~ 1,000,000원 입니다.")
    private Integer price;
    private RestaurantDto restaurant;

    public static MenuDto fromEntity(Menu entity) {
        return fromEntity(entity, false);
    }

    public static MenuDto fromEntity(Menu entity, boolean withRestaurant) {
        return MenuDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .img(entity.getImg())
                .price(entity.getPrice())
                .restaurant(withRestaurant ? RestaurantDto.fromEntity(entity.getRestaurant()) : null)
                .build();
    }
}
