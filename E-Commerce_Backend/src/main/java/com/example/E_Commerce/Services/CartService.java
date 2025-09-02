package com.example.E_Commerce.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.E_Commerce.Models.Cart;
import com.example.E_Commerce.Models.CartItem;
import com.example.E_Commerce.Models.Product;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Repositories.CartRepository;
import com.example.E_Commerce.Request.AddItemRequest;

@Service
public class CartService {
      @Autowired
    private CartRepository cartRepository;
     @Autowired
    private Product product ; 
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
      Product product = productService.getProductById(req.getProductId());
      CartItem isPresent = cartItemService.isCartItemExists(cart, product, req.getSize(), userId);
      if(isPresent==null){
        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setCart(cart);
        cartItem.setQuantity(req.getQuantity());
        cartItem.setUserId(userId);
        cartItem.setPrice(req.getQuantity()*product.getDiscountedPrice());
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
        totalPrice+=cartItem.getPrice();
        totalDiscount+=cartItem.getDiscountedPrice();
        totalItem += cartItem.getQuantity();

      }
      cart.setTotalDiscount(totalDiscount);
      cart.setTotalItems(totalItem);
      cart.setTotalPrice(totalPrice);
      cart.setDiscountedPrice(totalPrice-totalDiscount);
      return cartRepository.save(cart) ; 
    }
}
