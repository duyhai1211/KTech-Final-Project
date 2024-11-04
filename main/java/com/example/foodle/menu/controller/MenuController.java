package com.example.foodle.menu.controller;

import com.example.foodle.menu.MenuService;
import com.example.foodle.menu.dto.MenuDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("restaurant/{restaurantId}/menu")
public class MenuController {
    private final MenuService menuService;
    public Page<MenuDto> readPage(
            @PathVariable("shopId")
            Long resId,
            Pageable pageable
    ) {
        return menuService.readPage(resId, pageable);
    }

    @GetMapping("{menuId}")
    public MenuDto readOne(
            @PathVariable("restaurantId")
            Long resId,
            @PathVariable("menuId")
            Long menuId
    ) {
        return menuService.readOne(resId, menuId);
    }
}
