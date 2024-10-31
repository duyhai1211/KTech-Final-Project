package com.example.foodle.auth.config;

import com.example.foodle.auth.entity.CustomUserDetails;
import com.example.foodle.auth.entity.UserEntity;
import com.example.foodle.auth.repo.UserRepo;
import com.example.foodle.userinfo.GoogleUserInfo;
import com.example.foodle.userinfo.NaverUserInfo;
import com.example.foodle.userinfo.OAuth2UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // OAuth2 사용자 정보를 가져옵니다.
        OAuth2User oAuth2User = super.loadUser(userRequest);
        OAuth2UserInfo oAuth2UserInfo = null;

        // OAuth2 공급자에 따라 사용자 정보를 처리합니다.
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            oAuth2UserInfo = new NaverUserInfo((Map) oAuth2User.getAttributes().get("response"));
        }

        // 공급자와 공급자 ID로 사용자 이름 생성
        String provider = oAuth2UserInfo.getProvider();
        String providerId = oAuth2UserInfo.getProviderId();
        String username = provider + "_" + providerId;
        String userImgUrl = oAuth2UserInfo.getUserImgUrl();
        String email = oAuth2UserInfo.getEmail();
        String role = "ROLE_USER"; // 기본 사용자 역할

        // 사용자 존재 여부 확인
        Optional<UserEntity> optionalUserEntity = userRepository.findByUsername(username);

        UserEntity userEntity = optionalUserEntity.orElseGet(() -> {
            // 새 사용자 생성
            UserEntity newUser = UserEntity.builder()
                    .username(username)
                    .profileImg(userImgUrl)
                    .email(email)
                    .roles(role)
                    .build();
            userRepository.save(newUser); // 새 사용자 저장
            return newUser;
        });

        // CustomUserDetails 반환
        return (OAuth2User) new CustomUserDetails(userEntity, oAuth2User.getAttributes());
    }
}