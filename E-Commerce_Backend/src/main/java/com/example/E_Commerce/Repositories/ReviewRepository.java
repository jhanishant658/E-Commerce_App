package com.example.E_Commerce.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.E_Commerce.Models.Review;

public interface ReviewRepository extends JpaRepository<Review ,Long> {
    @Query("Select c from Review c where c.product.id :=productId")
 public List<Review> getAllProductsReview(@Param("productId")Long productId);
}
