package com.example.foodle;

import com.example.foodle.reservation.ReservationService;
import com.example.foodle.reservation.dto.ReservationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("views")
@RequiredArgsConstructor
public class ViewController {
    private final ReservationService reservationService;

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

    @GetMapping("reservation")
    public String getReservations(Model model) {
        return "reservation/reservation";
    }

    @GetMapping("restaurant-reservations")
    public String restaurantReservations() {
        return "reservation/restaurant-reservations";
    }

    @GetMapping("create-review")
    public String showCreateReviewPage() {
        return "review/create-review";
    }




}
