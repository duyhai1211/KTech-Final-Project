package com.example.foodle_project.user.model;

import com.example.foodle_project.user.model.dto.UserDto;
import com.example.foodle_project.user.model.entity.CustomUserDetailsSeivice;
import com.example.foodle_project.user.model.entity.Data;
import com.example.foodle_project.user.model.entity.User;
import com.example.foodle_project.user.model.jwt.JwtRequestDto;
import com.example.foodle_project.user.model.jwt.JwtResponseDto;
import com.example.foodle_project.user.model.jwt.JwtTokenUtils;
import com.example.foodle_project.user.model.repo.UserRepository;
import com.example.foodle_project.user.model.role.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final CustomUserDetailsSeivice customUserDetails;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtils jwtTokenUtils;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public Optional<User> findByUsername(String username) {
        return Optional.ofNullable(userRepository.findByUsername(username));
    }

    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    public User findByIdElseThrow(Long userId) {
        return findById(userId).orElseThrow();
    }

    public Optional<User> findByNickname(String nickname) {
        return  userRepository.findByNickname(nickname); }


    public JwtResponseDto signin(JwtRequestDto loginRequest) {
        this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        UserDetails userDetails = this.customUserDetails.loadUserByUsername(loginRequest.getUsername());
        String token = this.jwtTokenUtils.generateToken(userDetails);
        return new JwtResponseDto(token);
    }


    // user 생성
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
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
        return UserDto.fromUserEntity(user);
    }



    // update
//    // Cập nhật thông tin người dùng (chỉnh sửa thông tin)
//    public User updateUser(Long userId, UserDto userDto) {
//        User user = findById(userId);
//
//        // Cập nhật thông tin từ userDto vào đối tượng User
//        user.setNickname(userDto.getNickname());
//        user.setEmail(userDto.getEmail());
//        user.setPhone(userDto.getPhone());
//
//        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
//            String encPassword = passwordEncoder.encode(userDto.getPassword());
//            user.setPassword(encPassword);
//        }
//
//        return userRepository.save(user); // Lưu thông tin người dùng đã cập nhật
//    }

    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
        user.setNickname(userDto.getNickname());
        user.setEmail(userDto.getEmail());
        user.setAge(userDto.getAge());
        user.setPhone(userDto.getPhone());
        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            String encPassword = this.passwordEncoder.encode(userDto.getPassword());
            user.setPassword(encPassword);
        }

        User updatedUser = this.userRepository.save(user);
        return UserDto.fromUserEntity(updatedUser);
    }

    @Transactional
    public UserDto registerOwner(UserDto userDto) {
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã tồn tại");
        }
        String rawPassword = userDto.getPassword();
        String encPassword = this.passwordEncoder.encode(rawPassword);
        User owner = new User();
        owner.setUsername((userDto.getUsername()));
        owner.setEmail(userDto.getEmail());
        owner.setPassword(encPassword);
        owner.setRole(Role.ROLE_OWNER);

        User savedOwner = userRepository.save(owner);
        return new UserDto(savedOwner);
    }

  

}

