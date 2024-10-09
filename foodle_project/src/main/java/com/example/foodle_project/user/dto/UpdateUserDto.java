package com.example.foodle_project.user.dto;


import lombok.Generated;

public class UpdateUserDto {
    private String nickname;
    private String username;
    private String password;
    private String email;
    private String phone;

    @Generated
    public static UpdateUserDtoBuilder builder() {
        return new UpdateUserDtoBuilder();
    }

    @Generated
    public String getNickname() {
        return this.nickname;
    }

    @Generated
    public String getUsername() {
        return this.username;
    }

    @Generated
    public String getPassword() {
        return this.password;
    }

    @Generated
    public String getEmail() {
        return this.email;
    }

    @Generated
    public String getPhone() {
        return this.phone;
    }

    @Generated
    public UpdateUserDto() {
    }

    @Generated
    public UpdateUserDto(final String nickname, final String username, final String password, final String email, final String phone) {
        this.nickname = nickname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
    }
}
