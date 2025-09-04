package com.example.E_Commerce.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.E_Commerce.Models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  

    List<Product> findByCategoryName(@Param("name") String name);
    @Query("SELECT p FROM Product p " +
       "WHERE (:category IS NULL OR p.category.name = :category) " +
       "AND (:color IS NULL OR p.color = :color) " +
       "AND (:minPrice IS NULL OR p.discountedPrice >= :minPrice) " +
       "AND (:maxPrice IS NULL OR p.discountedPrice <= :maxPrice) " +
       "AND p.stock > 0")
List<Product> filterProducts(
    @Param("category") String category,
    @Param("color") String color,
    @Param("minPrice") Integer minPrice,
    @Param("maxPrice") Integer maxPrice
);


}
