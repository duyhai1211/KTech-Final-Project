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
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(Long memberId) {
        return userRepository.findById(memberId);
    }

    public User findByIdElseThrow(Long memberId) {
        return findById(memberId).orElseThrow();
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


//    // update
//    public void updateUser(UserDto userDto) {
//        User user = userRepository.findById(userDto.getId())
//                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
//        user.setNickname(userDto.getNickname());
//        user.setUsername(userDto.getUsername());
//        user.setEmail(userDto.getEmail());
//        user.setAge(userDto.getAge());
//        user.setPhone(userDto.getPhone());
//        if (!userDto.getPassword().isEmpty()) {
//            String encPassword = this.passwordEncoder.encode(userDto.getPassword());
//            user.setPassword(encPassword);
//        }
//
//        this.userRepository.save(user);
//    }

    // update
    public Data<User> edit(UserDto userDto, Long userId) {
        String nickname = userDto.getNickname();
        String password = userDto.getPassword();
        String email = userDto.getEmail();
        String phone = userDto.getPhone();


        Optional<User> opMember = findById(userId);
        if (opMember.isEmpty()) {
            return Data.of("F-1", "존재하지않는 회원입니다.");
        }
        User user = opMember.get();

        if (!user.getNickname().equals(nickname) && findByNickname(nickname).isPresent()) {
            return Data.of("F-3", "해당 닉네임(%s)은 이미 사용중입니다.".formatted(nickname));
        }

        user.updateProfile(nickname, email, phone, password);

        return Data.of("S-2", "내 정보 수정이 완료되었습니다.", user);

    }
  }

