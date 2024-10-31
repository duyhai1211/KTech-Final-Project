package com.example.foodle.auth.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.Map;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
    private Long id;
    private String username;
    private String password;
    private Integer age;
    private String email;
    private String phone;
    private String profileImg;
    private String rolesRaw; // 사용자 역할 정보를 저장
    @Getter
    private UserEntity entity;

    // OAuth2 인증을 위한 생성자
    public CustomUserDetails(UserEntity userEntity, Map<String, Object> attributes) {
        if (userEntity == null) {
            throw new IllegalArgumentException("UserEntity cannot be null");
        }
        this.entity = userEntity;
        this.username = userEntity.getUsername();
        this.password = userEntity.getPassword();
        this.age = userEntity.getAge();
        this.email = userEntity.getEmail();
        this.phone = userEntity.getPhone();
        this.profileImg = userEntity.getProfileImg();
        this.rolesRaw = userEntity.getRoles(); // rolesRaw 필드에 역할 정보 저장

        // 추가적으로 attributes를 활용할 수 있습니다. 예를 들어:
        if (attributes.containsKey("profileImg")) {
            this.profileImg = (String) attributes.get("profileImg");
        }
    }

    // UserEntity에서 CustomUserDetails 객체 생성
    public static CustomUserDetails fromEntity(UserEntity userEntity) {
        CustomUserDetails customUserDetails = new CustomUserDetails();
        customUserDetails.username = userEntity.getUsername();
        customUserDetails.password = userEntity.getPassword();
        // Chuyển đổi roles thành GrantedAuthority nếu cần
        customUserDetails.entity = userEntity;
        return customUserDetails;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 사용자 역할에 기반하여 GrantedAuthority 컬렉션 반환
        return Arrays.stream(entity.getRoles().split(","))
                .map(role -> (GrantedAuthority) () -> role)
                .toList();
    }

    @Override
    public String getPassword() {
        return this.entity.getPassword();
    }

    @Override
    public String getUsername() {
        return this.entity.getUsername();
    }

    public Long getId() {
        return this.entity.getId();
    }

    public Integer getAge() {
        return this.entity.getAge();
    }

    public String getEmail() {
        return this.entity.getEmail();
    }

    public String getPhone() {
        return this.entity.getPhone();
    }

    public String getProfileImg() {
        return this.entity.getProfileImg();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 계정이 만료되지 않음
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // 계정이 잠기지 않음
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 자격 증명이 만료되지 않음
    }

    @Override
    public boolean isEnabled() {
        return true; // 계정이 활성화됨
    }
}
