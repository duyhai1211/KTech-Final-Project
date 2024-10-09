package com.example.foodle_project.user.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String nickname; // 닉네임
    private String username; // 사용자 이름
    private String password; // 비밀번호
    private String email; // 이메일
    private Integer age; // 나이
    private String phone; // 전화번호
}
