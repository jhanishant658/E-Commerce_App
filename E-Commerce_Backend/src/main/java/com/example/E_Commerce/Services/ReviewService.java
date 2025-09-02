package com.example.E_Commerce.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.E_Commerce.Models.Product;
import com.example.E_Commerce.Models.Review;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Repositories.ReviewRepository;
import com.example.E_Commerce.Request.ReviewRequest;

@Service
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository ; 
    @Autowired
    private ProductService productService ; 
    public Review CreateReview(ReviewRequest req , User user  ){
   Product product = productService.getProductById(req.getProductId());
   Review review = new Review();
   review.setReview(req.getReview());
   review.setProduct(product);
   review.setUser(user);
   review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review) ; 
    }
  public List<Review> getAllReview(Long productId){
    return reviewRepository.getAllProductsReview(productId) ; 
  }
}
