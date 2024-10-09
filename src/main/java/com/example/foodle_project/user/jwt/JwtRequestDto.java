package com.example.foodle_project.user.jwt;

import lombok.Data;

@Data
public class JwtRequestDto {
    private String username;
    private String password;
}
