package com.example.E_Commerce.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.E_Commerce.Models.Rating;

public interface RatingRepository extends JpaRepository<Rating ,Long> {
  @Query("Select r from Rating r where r.product.id=:productid")
    List<Rating> getProductRating(@Param("productId")Long productId);

}
