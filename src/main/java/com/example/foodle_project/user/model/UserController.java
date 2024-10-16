package com.example.foodle_project.user.model;


import com.example.foodle_project.user.mypage.reservation.ReservationService;
import com.example.foodle_project.user.mypage.reservation.dto.ReservationDto;
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
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

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

//    @GetMapping({"/user"})
//    @ResponseBody
//    public String user(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
//        return "user";
//    }
//
//    @GetMapping({"/admin"})
//    @ResponseBody
//    public String admin() {
//        return "admin";
//    }
//
//    @GetMapping({"/owner"})
//    @ResponseBody
//    public String manager() {
//        return "owner";
//    }

    @GetMapping({"/loginForm"})
    public String loginForm() {
        return "loginForm";
    }

//    // 회원가입
//    @GetMapping({"/joinForm"})
//    public String joinForm() {
//        return "joinForm";
//    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi trong dữ liệu đầu vào");
        }

        try {
            userService.registerUser(userDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Tài khoản đã được tạo thành công");
        } catch (Exception e) {
            // Ghi log hoặc xử lý ngoại lệ tùy ý
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi tạo tài khoản");
        }
    }

    // jwt
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> loginUser(@RequestBody JwtRequestDto loginRequest) {
        try {
            JwtResponseDto response = userService.signin(loginRequest);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateUser(id, userDto);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PostMapping("/register-owner")
    public ResponseEntity<UserDto> registerOwner(@RequestBody UserDto dto) {
        UserDto user = userService.registerOwner(dto);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


//    // mypage
//    @GetMapping("/myInfo")
//    public String showMyInfo(Model model) {
//        if (rq.isLogout()) {
//            return rq.historyBack("로그인이 필요합니다.");
//        }
//        User user = userService.findByUsername(rq.getUser().getUsername())
//                .orElseThrow(() -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다."));
//        List<Review> reviewList = reviewService.findByReviewerId(user.getId());
//        List<ReservationDto> reservationList = reservationService.getReservationsByMemberId(user.getId());
//
//        LocalDateTime now = LocalDateTime.now();
//        reservationList.sort((r1, r2) -> {
//            LocalDateTime d1 = r1.getDate().atTime(r1.getReservationTime());
//            LocalDateTime d2 = r2.getDate().atTime(r2.getReservationTime());
//
//            boolean isR1Past = d1.isBefore(now);
//            boolean isR2Past = d2.isBefore(now);
//            if (isR1Past && !isR2Past) {
//                return 1;
//            } else if (!isR1Past && isR2Past) {
//                return -1;
//            } else {
//                return d1.compareTo(d2);
//            }
//        });
//
//        model.addAttribute("userInfo",user);
//        model.addAttribute("reviewList", reviewList);
//        model.addAttribute("reservations", reservationList);
//
//
//        return "user/myInfo";
//    }
//
//    // update
//    @GetMapping("/edit")
//    public String showEditInfo(Model model, Principal principal) {
//        String username = principal.getName();
//        User user = userService.findByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//        model.addAttribute("user", user);
//        return "editInfo"; // Trả về trang chỉnh sửa thông tin người dùng
//    }
//
//    //  Để tách logic sắp xếp đặt chỗ
//    private List<ReservationDto> getSortedReservations(Long userId) {
//        List<ReservationDto> reservations = reservationService.getReservationsByMemberId(userId);
//        LocalDateTime now = LocalDateTime.now();
//        reservations.sort(Comparator.comparing(reservation -> {
//            LocalDateTime dateTime = reservation.getDate().atTime(reservation.getReservationTime());
//            return dateTime.isBefore(now) ? LocalDateTime.MAX : dateTime;
//        }));
//        return reservations;
//    }


}

