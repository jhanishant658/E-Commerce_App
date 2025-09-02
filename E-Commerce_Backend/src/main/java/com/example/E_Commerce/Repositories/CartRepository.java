package com.example.E_Commerce.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.E_Commerce.Models.Cart;

public interface CartRepository  extends JpaRepository<Cart, Long> {
    @Query("select c from Cart c where c.userId =: userId ")
    public Cart findByUserId(@Param("userId") Long userId);
}
