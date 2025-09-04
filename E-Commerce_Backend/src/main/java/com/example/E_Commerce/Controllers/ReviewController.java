package com.example.E_Commerce.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.E_Commerce.Models.Review;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Request.ReviewRequest;
import com.example.E_Commerce.Services.ReviewService;

@RestController
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @PostMapping
    public Review createReview(@RequestBody ReviewRequest req , @AuthenticationPrincipal User user){
        return reviewService.CreateReview(req , user);
    }
    @GetMapping
    public List<Review> getAllReviews(@PathVariable Long productId){
        return reviewService.getAllReview(productId);
    }

}
