package com.example.E_Commerce.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.E_Commerce.Models.Cart;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Request.AddItemRequest;
import com.example.E_Commerce.Request.UpdateCartItemReq;
import com.example.E_Commerce.Services.CartService;


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
    @PatchMapping("/cartitem/{userId}/{cartItemId}")
    public Cart updateCartItem(@PathVariable Long userId , @PathVariable Long cartItemId, @RequestBody UpdateCartItemReq req){ 
        return cartService.updateCartItem(userId, cartItemId , req);
    }
    @DeleteMapping("/cartItem/{userId}/{cartItemId}")
    public void deleteCartItem(@PathVariable Long userId , @PathVariable Long cartItemId){
        cartService.deleteOneItem(userId , cartItemId);
    }
}
