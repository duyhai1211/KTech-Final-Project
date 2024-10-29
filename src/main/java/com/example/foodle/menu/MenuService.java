package com.example.foodle.menu;


import com.example.foodle.menu.dto.MenuDto;
import com.example.foodle.menu.entity.Menu;
import com.example.foodle.menu.repository.MenuRepo;
import com.example.foodle.restaurant.entity.Restaurant;
import com.example.foodle.restaurant.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
@RequiredArgsConstructor
public class MenuService {
    private final RestaurantRepository restaurantRepository;
    private final MenuRepo menuRepository;


    public Page<MenuDto> readPage(
            Long resId,
            Pageable pageable
    ) {
        checkResStatus(resId);
        return menuRepository.findAllByRestaurantId(resId, pageable)
                .map(MenuDto::fromEntity);
    }
    public MenuDto readOne(Long resId, Long menuId) {
        checkResStatus(resId);
        Menu item = menuRepository.findById(menuId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if(item.getRestaurant().getId().equals(resId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return MenuDto.fromEntity(item);
    }
    private void checkResStatus(Long resId) {
        Restaurant restaurant = restaurantRepository.findById(resId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (restaurant.getStatus() != Restaurant.Status.OPEN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }
}
