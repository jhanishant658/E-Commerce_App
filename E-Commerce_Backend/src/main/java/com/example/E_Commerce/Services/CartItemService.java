package com.example.E_Commerce.Services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.E_Commerce.Models.Cart;
import com.example.E_Commerce.Models.CartItem;
import com.example.E_Commerce.Models.Product;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Repositories.CartItemRepository;

import com.example.E_Commerce.Request.AddItemRequest;

@Service
public class CartItemService {
  
     @Autowired
    private UserService userService;
    @Autowired
    private CartItemRepository cartItemRepository;
   
   
    
     public CartItem createCartItem(CartItem cartItem){
        cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice() * cartItem.getQuantity());

        return cartItemRepository.save(cartItem);
      }
      public CartItem updateCartItem(Long cartItemId, Long userId,CartItem updatedCartItem){
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElse(null);
        if(cartItem == null){
            return null;
        }
        User user = userService.getUserById(userId);
        if(user == null){
            return null;
        }
        if(cartItem.getCart().getUser().getId().equals(userId)){
           cartItem.setQuantity(updatedCartItem.getQuantity());
           cartItem.setSize(updatedCartItem.getSize());
              cartItem.setPrice(updatedCartItem.getProduct().getPrice() * updatedCartItem.getQuantity());
              cartItem.setDiscountedPrice(updatedCartItem.getProduct().getDiscountedPrice() * updatedCartItem.getQuantity());
              return cartItemRepository.save(cartItem);
        }

       

        return null;
      }
      public CartItem isCartItemExists(Cart cart , Product product , String size, Long userId){
         return cartItemRepository.isCartItemExists(cart, product, size,userId);}
         public void removeCartItem(Long userId ,Long cartItemId){
            CartItem cartItem = cartItemRepository.findById(cartItemId).orElse(null); 
            User user = userService.findById(cartItem.getCart().getUser().getId());
            User requser = userService.getUserById(userId);
            if(user.getId().equals(requser.getId())){
                cartItemRepository.deleteById(cartItemId);
            }
            else{
                System.out.println("You can not delete your cart ");
            }
         }
        
           public String addCartItem(Long userId , AddItemRequest addItemRequest){
        
        User user = userService.getUserById(userId);
        if(user == null){
            return "User not found";
        }
        
        return "Item added to cart successfully";
      }
      
}
