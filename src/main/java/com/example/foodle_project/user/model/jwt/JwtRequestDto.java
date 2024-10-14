package com.example.foodle_project.user.model.jwt;

import lombok.Data;

@Data
public class JwtRequestDto {
    private String username;
    private String password;
}
