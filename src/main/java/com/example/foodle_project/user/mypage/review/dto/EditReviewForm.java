package com.example.foodle_project.user.mypage.review.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditReviewForm {
    private int rating;
    private String content;
}