package com.example.foodle_project.user.userinfo;

public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();
    String getUserImgUrl();
}

