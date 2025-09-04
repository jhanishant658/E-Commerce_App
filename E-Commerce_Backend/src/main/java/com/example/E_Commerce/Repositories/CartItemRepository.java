package com.example.E_Commerce.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.E_Commerce.Models.Cart;
import com.example.E_Commerce.Models.CartItem;
import com.example.E_Commerce.Models.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

  @Query("SELECT ci FROM CartItem ci WHERE ci.cart = :cart AND ci.product = :product AND ci.size = :size AND ci.userId = :userId")
CartItem isCartItemExists(@Param("cart") Cart cart,
                          @Param("product") Product product,
                          @Param("size") String size,
                          @Param("userId") Long userId);

    
}
