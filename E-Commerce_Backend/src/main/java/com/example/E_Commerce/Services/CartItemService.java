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
        // 1️⃣ CartItem fetch karo
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        // 2️⃣ User verify karo
        User cartOwner = cartItem.getCart().getUser();
        if (!cartOwner.getId().equals(userId)) {
            throw new RuntimeException("You cannot delete this cart item");
        }

        Cart cart = cartItem.getCart();

        // 3️⃣ Cart ke list se remove karo (memory me bhi remove hona chahiye)
        cart.getCartItems().removeIf(item -> item.getId().equals(cartItemId));

        // 4️⃣ Cart totals update karo (null safety ke saath)
        cart.setTotalItems(Math.max(0, cart.getTotalItems() - cartItem.getQuantity()));
        cart.setTotalPrice(Math.max(0.0, cart.getTotalPrice() - cartItem.getPrice()));
        cart.setTotalDiscount(Math.max(0, cart.getTotalDiscount() - (int) cartItem.getDiscountedPrice()));

        // 5️⃣ DB me changes save karo
        cartRepository.save(cart);
        cartItemRepository.delete(cartItem);
    }



    public String addCartItem(Long userId , AddItemRequest addItemRequest){
        
        User user = userService.getUserById(userId);
        if(user == null){
            return "User not found";
        }
        
        return "Item added to cart successfully";
      }
      
}
