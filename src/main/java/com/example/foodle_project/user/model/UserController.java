package com.example.foodle_project.user.model;


import com.example.foodle_project.user.mypage.reservation.ReservationService;
import com.example.foodle_project.user.mypage.reservation.dto.ReservationResponseDto;
import com.example.foodle_project.user.mypage.review.ReviewService;
import com.example.foodle_project.user.mypage.review.entity.Review;
import com.example.foodle_project.base.Rq;
import com.example.foodle_project.user.model.dto.UserDto;
import com.example.foodle_project.user.model.entity.CustomUserDetails;
import com.example.foodle_project.user.model.entity.User;
import com.example.foodle_project.user.model.jwt.JwtRequestDto;
import com.example.foodle_project.user.model.jwt.JwtResponseDto;
import com.example.foodle_project.user.model.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping({"users"})
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ReviewService reviewService;
    private final ReservationService reservationService;


    private final Rq rq;

//    @GetMapping({"/test/login"})
//    @ResponseBody
//    public String testLogin(Authentication authentication, @AuthenticationPrincipal CustomUserDetails userDetails) {
//        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
//        return "세션 정보 확인하기";
//    }
//
//    @GetMapping({"/test/oauth/login"})
//    @ResponseBody
//    public String testOAuthLogin(Authentication authentication, @AuthenticationPrincipal OAuth2User oauth) {
//        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//        return "OAuth 세션 정보 확인하기";
//    }

    @GetMapping({"/user"})
    @ResponseBody
    public String user(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return "user";
    }

    @GetMapping({"/admin"})
    @ResponseBody
    public String admin() {
        return "admin";
    }

    @GetMapping({"/owner"})
    @ResponseBody
    public String manager() {
        return "owner";
    }

    @GetMapping({"/loginForm"})
    public String loginForm() {
        return "loginForm";
    }

    // 회원가입
    @GetMapping({"/joinForm"})
    public String joinForm() {
        return "joinForm";
    }

    @PostMapping({"/join"})
    public String join(UserDto userDto, BindingResult result) {
        if (result.hasErrors()) {
            return "joinForm";
        } else {
            this.userService.registerUser(userDto);
            return "redirect:/loginForm";
        }
    }

//    @Secured({"ROLE_ADMIN"})
//    @GetMapping({"/info"})
//    @ResponseBody
//    public String info() {
//        return "개인정보";
//    }
//
//    @PreAuthorize("hasRole('ROLE_OWNER') or hasRole('ROLE_ADMIN')")
//    @GetMapping({"/data"})
//    @ResponseBody
//    public String data() {
//        return "데이터정보";
//    }

    // jwt
    @PostMapping({"/login"})
    public ResponseEntity<JwtResponseDto> loginUser(@RequestBody JwtRequestDto loginRequest) {
        try {
            JwtResponseDto response = this.userService.signin(loginRequest);
            return ResponseEntity.ok(response);
        } catch (RuntimeException var3) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body((JwtResponseDto) null);
        }
    }

//    // update
//    @GetMapping({"/edit/{id}"})
//    public String editUserForm(@PathVariable Long id, Model model) {
//        UserDto userDto = this.userService.getUserById(id);
//        model.addAttribute("user", userDto);
//        return "editUserForm";
//    }
//
//    @PostMapping("/edit")
//    public String editUser(@ModelAttribute UserDto userDto) {
//        userService.updateUser(userDto);
//        return "redirect:/users/info"; // 수정 완료 후 정보 페이지로 리다이렉트
//    }

    // mypage
    @GetMapping("/myInfo")
    public String showMyInfo(Model model) {
        if (rq.isLogout()) {
            return rq.historyBack("로그인이 필요합니다.");
        }
        User user = userService.findByUsername(rq.getUser().getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다."));
        List<Review> reviewList = reviewService.findByReviewerId(user.getId());
        List<ReservationResponseDto> reservationList = reservationService.getReservationsByMemberId(user.getId());


        // update
    }
}

