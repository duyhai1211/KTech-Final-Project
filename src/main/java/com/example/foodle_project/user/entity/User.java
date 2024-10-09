package com.example.foodle_project.user.entity;


import com.example.foodle_project.user.role.Role;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

@Builder
@Getter
@Setter
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

    private String userImgUrl;
    private String provider;
    private String providerId;
    private boolean enabled;

    public void setNickname(String nickname) {
    }


    public void setPassword(String password) {
        this.password = password;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setRole(Role role) {
        this.role = role;
    }

}
