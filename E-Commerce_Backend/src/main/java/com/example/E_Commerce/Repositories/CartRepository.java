package com.example.E_Commerce.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;


import com.example.E_Commerce.Models.Cart;

public interface CartRepository  extends JpaRepository<Cart, Long> {
  public Cart findByUserId(Long userId);

}
