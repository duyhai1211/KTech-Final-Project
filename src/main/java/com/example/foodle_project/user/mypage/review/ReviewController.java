package com.example.foodle_project.user.mypage.review;

import com.example.foodle_project.base.Rq;
import com.example.foodle_project.user.model.entity.Data;
import com.example.foodle_project.user.model.entity.User;
import com.example.foodle_project.user.mypage.reservation.Reservation;
import com.example.foodle_project.user.mypage.reservation.ReservationService;
import com.example.foodle_project.user.mypage.review.dto.AddReviewForm;
import com.example.foodle_project.user.mypage.review.dto.EditReviewForm;
import com.example.foodle_project.user.mypage.review.entity.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;
    private final ReservationService reservationService;
    private final Rq rq;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/add/{reservationId}")
    public String showAddReview(@PathVariable Long reservationId, Model model) {
        Reservation reservation = reservationService.findByIdElseThrow(reservationId);
        model.addAttribute("restaurant", reservation.getRestaurant());
        model.addAttribute("now", LocalDateTime.now());
        return "usr/review/add";
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/add/{reservationId}")
    public String addReview(@PathVariable Long reservationId, AddReviewForm addReviewForm) {
        Reservation reservation = reservationService.findByIdElseThrow(reservationId);

        Data<Review> rsData = reviewService.addReview(addReviewForm.getContent(),
                addReviewForm.getRating(), reservation, rq.getUser().getId());

        if (rsData.isFail()) {
            return rq.historyBack(rsData.getMsg());
        }

        return "redirect:/reservation/check";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/check")
    public String showList(Model model, @RequestParam(defaultValue = "1") int sortCode) {
        User user = rq.getUser();

        if(user != null){
            Data<List<Review>> reviewList = reviewService.getReviews(user.getId(), sortCode);
            model.addAttribute("reviewList", reviewList.getData());
        }

        return "usr/review/check";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/edit/{reviewId}")
    public String showEdit(@PathVariable Long reviewId, Model model) {
        Data canModifyRsData = reviewService.canEdit(rq.getUser().getId(), reviewId);

        if (canModifyRsData.isFail()) return rq.historyBack(canModifyRsData.getMsg());

        model.addAttribute("review", canModifyRsData.getData());

        return "usr/review/edit";
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/edit/{reviewId}")
    public String edit(@PathVariable Long reviewId, EditReviewForm form) {
        Data<Review> rsData = reviewService.edit(rq.getUser().getId(), reviewId, form.getRating(), form.getContent());

        if (rsData.isFail()) {
            return rq.historyBack(rsData.getMsg());
        }

        return "redirect:/review/check";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/delete/{reviewId}")
    public String showDelete(@PathVariable Long reviewId) {
        Review review = reviewService.findById(reviewId).orElseThrow();

        Data canDeleteRsData = reviewService.canDelete(rq.getUser(), review);

        if(canDeleteRsData.isFail()) return rq.historyBack(canDeleteRsData.getMsg());

        reviewService.delete(review);

        return "redirect:/review/check";
    }
}

