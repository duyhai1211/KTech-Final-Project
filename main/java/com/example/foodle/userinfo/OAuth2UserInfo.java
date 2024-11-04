package com.example.foodle.userinfo;

public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();
    String getUserImgUrl();
}

