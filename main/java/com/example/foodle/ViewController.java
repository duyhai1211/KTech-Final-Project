package com.example.foodle;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/users")
    public String userHome() {
        return "users/index"; // Điều hướng đến templates/user/index.html
    }

    @GetMapping("/users/login")
    public String loginPage() {
        return "users/login"; // Điều hướng đến templates/user/login.html
    }

    @GetMapping("/users/signup")
    public String signupPage() {
        return "users/signup"; // Điều hướng đến templates/user/signup.html
    }


}
