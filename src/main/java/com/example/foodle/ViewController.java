package com.example.foodle;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/users")
    public String userHome() {
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

    @GetMapping("/users/orders")
    public String ordersPage() {
        return "user/orders"; // Điều hướng đến templates/user/orders.html
    }
}
