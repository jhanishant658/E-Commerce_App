package com.example.E_Commerce.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.E_Commerce.Models.Rating;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Request.RatingRequest;
import com.example.E_Commerce.Services.RatingService;
import com.example.E_Commerce.Services.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/rating")
public class RatingController {
   @Autowired
   private RatingService ratingService;
   @Autowired
   private UserService userService;
    @PostMapping("/{userId}")
    public Rating createRating(@RequestBody RatingRequest req, @PathVariable Long userId) {
         User user = userService.getUserById(userId);
        return ratingService.createRating(req, user);
    }
    @GetMapping
    public List<Rating> getAllRating(@PathVariable Long productId) {
        return ratingService.getProductRating(productId);
    }
    
    
    
}
