package com.example.foodle_project.restaurant.menu.dto;

import com.example.foodle_project.restaurant.menu.entity.Menu;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

@Data
public class MenuDto {
    @NotBlank(message = "메뉴 이름을 입력해주세요.")
    private String menuName;
    @Range(min = 500, max = 1000000, message = "메뉴 가격은 500원 ~ 1,000,000원 입니다.")
    private Integer price;
    // Getter và Setter cho menuName
    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    // Getter và Setter cho price
    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }


    public Menu toEntity() {
        return Menu.builder()
                .menuName(menuName)
                .price(price)
                .build();
    }
}
