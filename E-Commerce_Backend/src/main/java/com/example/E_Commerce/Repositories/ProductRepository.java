package com.example.E_Commerce.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.E_Commerce.Models.Category;
import com.example.E_Commerce.Models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  

    
    List<Product> findByCategory(Category category);
    @Query("""
SELECT p FROM Product p
WHERE (:level1 IS NULL OR p.category.parentCategory.parentCategory.name = :level1)
AND (:level2 IS NULL OR p.category.parentCategory.name = :level2)
AND (:level3 IS NULL OR p.category.name = :level3)
AND (:color IS NULL OR p.color = :color)
AND (:minPrice IS NULL OR p.discountedPrice >= :minPrice)
AND (:maxPrice IS NULL OR p.discountedPrice <= :maxPrice)
AND p.stock > 0
""")
    List<Product> filterProducts(
            @Param("level1") String level1,
            @Param("level2") String level2,
            @Param("level3") String level3,
            @Param("color") String color,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice
    );
    List<Product> findByBrandContainingAndStockGreaterThan(String brand,int stock );
    List<Product> findByTitleContainingAndStockGreaterThan(String name , int Stock);
    



}
