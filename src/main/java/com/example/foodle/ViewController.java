package com.example.foodle;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("views")
public class ViewController {

    @GetMapping
    public String userMain() {
        return "user/main"; // Điều hướng đến templates/user/index.html
    }

    @GetMapping("/users/login")
    public String loginPage() {
        return "user/login"; // Điều hướng đến templates/user/login.html
    }

    @GetMapping("/users/signup")
    public String signupPage() {
        return "user/signup"; // Điều hướng đến templates/user/signup.html
    }

    @GetMapping("/admin")
    public String adminHome() {
        return "admin/admin"; // Điều hướng đến templates/user/index.html
    }

    @GetMapping("/users")
    public String userHome() {
        return "user/home"; // Điều hướng đến templates/user/index.html
    }

    @GetMapping("user/myinfo")
    public String myPage() {
        return "user/myinfo";
    }

    @GetMapping("/users/update")
    public String userUpdatePage() {
        return "user/update";
    }

    @GetMapping("restaurant/all")
    public String restaurantPage() {
        return "restaurant/restaurantAll";
    }



}
