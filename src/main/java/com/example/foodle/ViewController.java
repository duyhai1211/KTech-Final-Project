package com.example.foodle;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("views")
public class ViewController {
    @GetMapping
    public String index() {
        return "index";
    }

    @GetMapping("login")
    public String login() {
        return "login";
    }

    @GetMapping("signup")
    public String signUp() {
        return "signup";
    }

    @GetMapping("/mypage")
    public String myPage() {
        return "mypage";
    }

    @GetMapping("users/update")
    public String userUpdatePage() {
        return "user/update";
    }

    @GetMapping("users/upgrade")
    public String userUpgrade() {
        return "user/upgrade";
    }

    @GetMapping("/reservation")
    public String getReservationPage(@RequestParam Long restaurantId, Model model) {
        model.addAttribute("restaurantId", restaurantId);
        return "reservation";
    }



}
