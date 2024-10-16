package com.example.foodle_project.user.model.entity;


import com.example.foodle_project.user.model.role.Role;
import com.example.foodle_project.user.mypage.reservation.Reservation;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Builder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickname;

    @Setter
    @NotNull
    private String username;

    @NotNull
    @Column(nullable = false)
    private String password;
    private String email;
    private Integer age;
    private String phone;

    @Enumerated(EnumType.STRING)
    private Role role;
    private String profileImg;
    private String provider;
    private String providerId;
    private boolean enabled;

    @OneToMany(mappedBy = "user")
    @Builder.Default
    private List<Reservation> reservations = new ArrayList<>();

    @CreatedDate
    private LocalDateTime createDate;
    private String providerTypeCode;

    @LastModifiedDate
    private LocalDateTime modifyDate;


    public List<? extends GrantedAuthority> getGrantedAuthorities() {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

        grantedAuthorities.add(new SimpleGrantedAuthority("member"));

        if ("admin".equals(username)) {
            grantedAuthorities.add(new SimpleGrantedAuthority("admin"));
        }

        return grantedAuthorities;
    }

    public void updateProfile(String password, String nickname, String email, String phone) {
        this.nickname = nickname;
        this.email = email;
        this.phone = phone;
        this.password = password;

    }
}