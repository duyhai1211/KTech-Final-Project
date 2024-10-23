package com.example.foodle_project.user.model.jwt;

import lombok.Data;

@Data
public class JwtResponseDto {
    private String token;

    public JwtResponseDto(String token) {
    }
}
