package com.example.foodle;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
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
        return "admin/admin"; // Điều hướng đến templates/admin/admin.html
    }

    @GetMapping("/users")
    public String userHome() {
        return "user/home"; // Điều hướng đến templates/user/home.html
    }

    @GetMapping("/user/myinfo")
    public String myPage() {
        return "/user/myinfo"; // Điều hướng đến templates/user/myinfo.html
    }

    @GetMapping("/users/signup-owner")
    public String ownerSignupPage() {
        return "user/signupOwner"; // Điều hướng đến templates/user/signupOwner.html
    }

    // Trang chính của nhà hàng
    @GetMapping("/restaurant/home")
    public String restaurantHomePage() {
        return "restaurant/home"; // Điều hướng đến templates/restaurant/home.html
    }

    // Trang quản lý menu nhà hàng
    @GetMapping("/restaurant/menus")
    public String restaurantMenuPage() {
        return "restaurant/menu"; // Điều hướng đến templates/restaurant/menu.html
    }

    // Trang để xem và chỉnh sửa thông tin nhà hàng
    @GetMapping("/restaurant/profile")
    public String restaurantProfilePage() {
        return "restaurant/myRestaurant"; // Điều hướng đến templates/restaurant/profile.html
    }

    // Trang để xem các yêu cầu mở nhà hàng
    @GetMapping("/restaurant/open-requests")
    public String openRequestsPage() {
        return "restaurant/requestOpen"; // Điều hướng đến templates/restaurant/openRequests.html
    }

    // Trang để quản lý hình ảnh của nhà hàng
    @GetMapping("/restaurant/images")
    public String restaurantImagesPage() {
        return "restaurant/images"; // Điều hướng đến templates/restaurant/images.html
    }
}
