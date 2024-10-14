package com.example.foodle_project.user.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Data <T> {
    private String resultCode;
    private String msg;
    private T data;

    public static <T> Data<T> of(String resultCode, String msg, T data) {
        return new Data<>(resultCode, msg, data);
    }

    public static <T> Data<T> of(String resultCode, String msg) {
        return of(resultCode, msg, null);
    }

    public static <T> Data<T> successOf(T data) {
        return of("S-1", "성공", data);
    }

    public static <T> Data<T> failOf(T data) {
        return of("F-1", "실패", data);
    }

    public boolean isSuccess() {
        return resultCode.startsWith("S-");
    }

    public boolean isFail() {
        return !isSuccess();
    }
}


