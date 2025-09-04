package com.example.E_Commerce.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.E_Commerce.Models.Cart;
import com.example.E_Commerce.Models.CartItem;
import com.example.E_Commerce.Models.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query("select ci from CartItem ci where ci.cart =:cart and ci.product=:product and ci.size =:size and ci.userId = userId ")
    CartItem isCartItemExists(@Param("cart")Cart cart, @Param(" product")Product product,@Param("Size") String size,@Param("userId") Long userId);
    
}
