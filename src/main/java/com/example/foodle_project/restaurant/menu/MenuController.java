package com.example.foodle_project.restaurant.menu;

import com.example.foodle_project.restaurant.menu.dto.MenuDto;
import com.example.foodle_project.restaurant.retaurant.RestaurantService;
import com.example.foodle_project.restaurant.retaurant.entity.Restaurant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/restaurant")
public class MenuController {

    private final RestaurantService restaurantService;
    private final MenuService menuService;

    //메뉴 업데이트 화면으로 이동
    @GetMapping("/{restaurantId}/menu/edit")
    public String menuUpdatePage(@PathVariable Long restaurantId, Model model){
        Restaurant findRestaurant = restaurantService.findOne(restaurantId);
        model.addAttribute("restaurant", findRestaurant);

        return "메뉴 업데이트 뷰";
    }


    //Content-type = application/json
    @PostMapping("/{restaurantId}/menu/edit")
    @ResponseBody
    public String menuUpdate(@PathVariable Long restaurantId, Model model,
                             @RequestBody List<MenuDto> menuUpdateList){
        //[{"menuName":"얄로 ","price":"1000"},{"menuName":"장어","price":"20000"}]
        //위와 같은 형태로 string 형태로 데이터가 넘어온다.
        Restaurant findRestaurant = restaurantService.findOne(restaurantId);
        menuService.updateMenuList(findRestaurant, menuUpdateList);


        return "메뉴 업데이트 뷰";
    }

}
