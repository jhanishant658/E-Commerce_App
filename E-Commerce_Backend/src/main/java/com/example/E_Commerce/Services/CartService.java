package com.example.E_Commerce.Services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.E_Commerce.Models.Cart;
import com.example.E_Commerce.Models.CartItem;
import com.example.E_Commerce.Models.Product;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Repositories.CartRepository;
import com.example.E_Commerce.Request.AddItemRequest;
import com.example.E_Commerce.Request.UpdateCartItemReq;

@Service
public class CartService {
      @Autowired
    private CartRepository cartRepository;
      
    @Autowired
    private CartItemService cartItemService ;
    @Autowired 
    private ProductService productService;
    public Cart createCart(User user){
      Cart cart = new Cart();
      cart.setUser(user);
      return cartRepository.save(cart) ; 
    }
    public String addCartItem(Long userId , AddItemRequest
    req){
      Cart cart = cartRepository.findByUserId(userId);
      if(cart==null){
        cart = createCart(new UserService().findById(userId));
      }
      Product product = productService.getProductById(req.getProductId());
      CartItem isPresent = cartItemService.isCartItemExists(cart, product, req.getSize(), userId);
      if(isPresent==null){
        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setCart(cart);
        cartItem.setQuantity(req.getQuantity());
        cartItem.setUserId(userId);
       cartItem.setPrice(product.getPrice()*req.getQuantity());
       cartItem.setDiscountedPrice(req.getQuantity()*product.getDiscountedPrice());
        cartItem.setSize(req.getSize());
        CartItem createdCartItem=cartItemService.createCartItem(cartItem);
        cart.getCartItems().add(createdCartItem);

      }
      return "Item added to cart" ; 
    }
    public Cart findUserCart(Long userId){
      Cart cart = cartRepository.findByUserId(userId);
      int totalPrice =0 ;
      int totalDiscount =0 ;
      int totalItem =0 ; 
      for(CartItem cartItem:cart.getCartItems()){
       totalPrice += cartItem.getPrice();              // MRP total
      totalDiscount += (cartItem.getPrice() - cartItem.getDiscountedPrice()); // actual discount
    
        totalItem += cartItem.getQuantity();

      }
      cart.setTotalDiscount(totalDiscount);
      cart.setTotalItems(totalItem);
      cart.setTotalPrice(totalPrice);
      cart.setDiscountedPrice(totalPrice - totalDiscount); // Net payable amount
      return cartRepository.save(cart) ; 
    }
    public Cart updateCartItem(Long userId, Long cartItemId, UpdateCartItemReq req) {
    Cart cart = cartRepository.findByUserId(userId);

    // Ye function directly DB se CartItem nikal ke update karta hai
    CartItem updatedItem = cartItemService.updateCartItem(cartItemId, userId, req);

    if (updatedItem != null) {
        return findUserCart(userId);
    }
    return cart;
}

 public void deleteCartItem(Long userId) {
    Cart cart = cartRepository.findByUserId(userId);

    // cartItems ka ek copy banao (ye normal HashSet hai, Hibernate ka proxy nahi)
    Set<CartItem> cartItemsCopy = new HashSet<>(cart.getCartItems());

    // Ab safe iteration karo
    for (CartItem cartItem : cartItemsCopy) {
        cartItemService.removeCartItem(userId, cartItem.getId());
    }

    // Optional: cart ko clear bhi kar do, taki Hibernate ka state sync rahe
    cart.getCartItems().clear();
    cartRepository.save(cart);
}


}
