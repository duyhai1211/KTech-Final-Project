package com.example.foodle_project.user;

import com.example.foodle_project.user.dto.UserDto;
import com.example.foodle_project.user.entity.CustomUserDetails;
import com.example.foodle_project.user.entity.CustomUserDetailsSeivice;
import com.example.foodle_project.user.entity.User;
import com.example.foodle_project.user.jwt.JwtRequestDto;
import com.example.foodle_project.user.jwt.JwtResponseDto;
import com.example.foodle_project.user.jwt.JwtTokenUtils;
import com.example.foodle_project.user.repo.UserRepository;
import com.example.foodle_project.user.role.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final CustomUserDetailsSeivice customUserDetails;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtils jwtTokenUtils;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public JwtResponseDto signin(JwtRequestDto loginRequest) {
        this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        UserDetails userDetails = this.customUserDetails.loadUserByUsername(loginRequest.getUsername());
        String token = this.jwtTokenUtils.generateToken(userDetails);
        return new JwtResponseDto(token);
    }

    @Transactional
    public void registerUser(UserDto userDto) {
        String rawPassword = userDto.getPassword();
        String encPassword = this.passwordEncoder.encode(rawPassword);
        User user = new User();
        user.setNickname(userDto.getNickname());
        user.setUsername(userDto.getUsername());
        user.setPassword(encPassword);
        user.setEmail(userDto.getEmail());
        user.setAge(userDto.getAge());
        user.setPhone(userDto.getPhone());
        user.setRole(Role.valueOf("ROLE_USER"));
        this.userRepository.save(user);
    }

    public UserDto getUserById(Long id) {
        User user = (User)this.userRepository.findById(id).orElseThrow(() -> {
            return new RuntimeException("\uc0ac\uc6a9\uc790\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.");
        });
        return this.convertToDto(user);
    }

    public void updateUser(UserDto userDto) {
        User user = userRepository.findById(userDto.getId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        user.setNickname(userDto.getNickname());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setAge(userDto.getAge());
        user.setPhone(userDto.getPhone());
        if (!userDto.getPassword().isEmpty()) {
            String encPassword = this.passwordEncoder.encode(userDto.getPassword());
            user.setPassword(encPassword);
        }

        this.userRepository.save(user);
    }

    private UserDto convertToDto(User user) {
        return UserDto.builder().nickname(user.getNickname()).username(user.getUsername()).email(user.getEmail()).age(user.getAge()).phone(user.getPhone()).build();
    }

  }

