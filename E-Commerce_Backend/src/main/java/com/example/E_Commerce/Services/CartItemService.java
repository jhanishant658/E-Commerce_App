package com.example.E_Commerce.Services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.E_Commerce.Models.Cart;
import com.example.E_Commerce.Models.CartItem;
import com.example.E_Commerce.Models.Product;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Repositories.CartItemRepository;
import com.example.E_Commerce.Repositories.CartRepository;
import com.example.E_Commerce.Request.AddItemRequest;
import com.example.E_Commerce.Request.UpdateCartItemReq;

@Service
public class CartItemService {
  
     @Autowired
    private UserService userService;
    @Autowired
    private CartItemRepository cartItemRepository;
   
   @Autowired
   private CartRepository cartRepository;
    
     public CartItem createCartItem(CartItem cartItem){
        cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice() * cartItem.getQuantity());

        return cartItemRepository.save(cartItem);
      }
      public CartItem updateCartItem(Long cartItemId, Long userId,UpdateCartItemReq updatedCartItem){
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
           
              cartItem.setPrice(cartItem.getProduct().getPrice() * updatedCartItem.getQuantity());
              cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice() * updatedCartItem.getQuantity());
              return cartItemRepository.save(cartItem);
        }

       

        return null;
      }
      public CartItem isCartItemExists(Cart cart , Product product , String size, Long userId){
         return cartItemRepository.isCartItemExists(cart, product, size,userId);}
        public void removeCartItem(Long userId, Long cartItemId) {
    CartItem cartItem = cartItemRepository.findById(cartItemId)
                        .orElseThrow(() -> new RuntimeException("CartItem not found"));

    User user = userService.findById(cartItem.getCart().getUser().getId());
    User reqUser = userService.getUserById(userId);

    if (user.getId().equals(reqUser.getId())) {
        Cart cart = cartItem.getCart();

        // cart ke andar se bhi remove kar
        cart.getCartItems().remove(cartItem);

        // DB se delete kar
        cartItemRepository.delete(cartItem);

        // totals update kar
        cart.setTotalItems(cart.getTotalItems() - cartItem.getQuantity());
        cart.setTotalPrice(cart.getTotalPrice() - cartItem.getPrice());
        cart.setTotalDiscount((int)cart.getTotalDiscount() - (int)cartItem.getDiscountedPrice());

        cartRepository.save(cart);
    } else {
        System.out.println("You cannot delete this cart item");
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
