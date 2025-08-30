package com.example.E_Commerce.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.E_Commerce.Models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  

    List<Product> findByCategory(String category);
    @Query("select p from Product p  " + "where (:category is null or p.category.name = :category) " +
    "and (:color is null or p.color = :color) " + 
    "and (:minPrice is null or p.discountedPrice >= :minPrice) " +
    "and (:maxPrice is null or p.discountedPrice <= :maxPrice) "
    + "and (:minDiscount is null or p.discountpercent >= :minDiscount) " +
    "and (:maxDiscount is null or p.discountpercent <= :maxDiscount) " +
    "and p.stock > 0 " +
    "order by " +
    "case when :sortBy = 'priceAsc' then p.discountedPrice end asc, " +
    "case when :sortBy = 'priceDesc' then p.discountedPrice end desc, " +
    "case when :sortBy = 'discountAsc' then p.discountpercent end asc, " +
    "case when :sortBy = 'discountDesc' then p.discountpercent end desc")

    public List<Product> filteProducts(@Param ("category") String category, @Param ("color") String color, @Param ("minPrice") 
    Integer minPrice, @Param ("maxPrice") Integer maxPrice, @Param ("minDiscount") Integer minDiscount, @Param ("maxDiscount") Integer maxDiscount,
     @Param("sortBy") String sortBy);
    
}
