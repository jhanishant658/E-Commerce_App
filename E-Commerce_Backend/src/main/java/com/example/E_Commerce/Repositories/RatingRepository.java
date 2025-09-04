package com.example.E_Commerce.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.E_Commerce.Models.Rating;

public interface RatingRepository extends JpaRepository<Rating ,Long> {
  @Query("SELECT r FROM Rating r WHERE r.product.id = :productId")
    List<Rating> getProductRating(Long productId);

}
