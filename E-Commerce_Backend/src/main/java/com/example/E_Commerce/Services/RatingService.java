package com.example.E_Commerce.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.E_Commerce.Models.Product;
import com.example.E_Commerce.Models.Rating;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Repositories.RatingRepository;
import com.example.E_Commerce.Request.RatingRequest;

@Service
public class RatingService {
    @Autowired
    private RatingRepository ratingRepository ; 
    @Autowired
    private ProductService productService ; 
  public Rating createRating(RatingRequest req ,User user){
      Product product = productService.getProductById(req.getProductId());
      Rating rating = new Rating();
      rating.setProduct(product);
      rating.setRating(req.getRating());
      rating.setUser(user);
      rating.setCreatedAt(LocalDateTime.now());
    return ratingRepository.save(rating); 
  }
  public List<Rating> getProductRating(Long productId){
   return ratingRepository.getProductRating(productId);
    
  }
}
