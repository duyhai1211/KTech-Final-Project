package com.example.foodle_project.user.model.dto;


import com.example.foodle_project.user.model.entity.User;
import com.example.foodle_project.user.model.role.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Role role;
    private String profileImg;

    public UserDto(User savedOwner) {
    }


    public static UserDto fromUserEntity(User entity) {
        if (entity == null) {
            return null;
        }

        return UserDto.builder()
                .id(entity.getId())
                .username(entity.getUsername())
                .nickname(entity.getNickname())
                .password(entity.getPassword())
                .age(entity.getAge())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .role(entity.getRole())
                .profileImg(entity.getProfileImg())
                .build();
    }
}
