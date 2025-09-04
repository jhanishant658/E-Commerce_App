package com.example.E_Commerce.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.E_Commerce.Models.Cart;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Request.AddItemRequest;
import com.example.E_Commerce.Services.CartService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class CartController {
    @Autowired
    private CartService cartService ; 
    
    @PostMapping("/cart")
    public Cart createCart(@RequestBody User user) {
        return cartService.createCart(user);
    }
    @PostMapping("/cartitem/{userId}")
    public String AddCartItem(@PathVariable Long userId ,@RequestBody AddItemRequest req  ) {
        return cartService.addCartItem(userId , req);
    }
      
    @GetMapping("/usercart/{userId}")
    public Cart findUserCart(@PathVariable Long userId){
        return cartService.findUserCart(userId);
    }
    
    
}
