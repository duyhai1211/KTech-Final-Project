package com.example.foodle_project.user;


import com.example.foodle_project.user.dto.UserDto;
import com.example.foodle_project.user.entity.CustomUserDetails;
import com.example.foodle_project.user.jwt.JwtRequestDto;
import com.example.foodle_project.user.jwt.JwtResponseDto;
import com.example.foodle_project.user.repo.UserRepository;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping({"users"})
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @GetMapping({"/test/login"})
    @ResponseBody
    public String testLogin(Authentication authentication, @AuthenticationPrincipal CustomUserDetails userDetails) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return "세션 정보 확인하기";
    }

    @GetMapping({"/test/oauth/login"})
    @ResponseBody
    public String testOAuthLogin(Authentication authentication, @AuthenticationPrincipal OAuth2User oauth) {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        return "OAuth 세션 정보 확인하기";
    }

    @GetMapping({"/user"})
    @ResponseBody
    public String user(@AuthenticationPrincipal CustomUserDetails customUserDetailsService) {
        return "user";
    }

    @GetMapping({"/admin"})
    @ResponseBody
    public String admin() {
        return "admin";
    }

    @GetMapping({"/manager"})
    @ResponseBody
    public String manager() {
        return "manager";
    }

    @GetMapping({"/loginForm"})
    public String loginForm() {
        return "loginForm";
    }

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

    @Secured({"ROLE_ADMIN"})
    @GetMapping({"/info"})
    @ResponseBody
    public String info() {
        return "개인정보";
    }

    @PreAuthorize("hasRole('ROLE_OWNER') or hasRole('ROLE_ADMIN')")
    @GetMapping({"/data"})
    @ResponseBody
    public String data() {
        return "데이터정보";
    }

    @PostMapping({"/login"})
    public ResponseEntity<JwtResponseDto> loginUser(@RequestBody JwtRequestDto loginRequest) {
        try {
            JwtResponseDto response = this.userService.signin(loginRequest);
            return ResponseEntity.ok(response);
        } catch (RuntimeException var3) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body((JwtResponseDto) null);
        }
    }

    // update
    @GetMapping({"/edit/{id}"})
    public String editUserForm(@PathVariable Long id, Model model) {
        UserDto userDto = this.userService.getUserById(id);
        model.addAttribute("user", userDto);
        return "editUserForm";
    }

    @PostMapping("/edit")
    public String editUser(@ModelAttribute UserDto userDto) {
        userService.updateUser(userDto);
        return "redirect:/users/info"; // 수정 완료 후 정보 페이지로 리다이렉트
    }



}

