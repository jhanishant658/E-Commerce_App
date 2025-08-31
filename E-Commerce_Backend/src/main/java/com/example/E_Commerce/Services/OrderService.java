package com.example.E_Commerce.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.E_Commerce.Models.Address;
import com.example.E_Commerce.Models.Order;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Repositories.CartRepository;

@Service
public class OrderService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemService cartItemService;
    private ProductService productService;
        public Order  createOrder(User user,
    Address shippingAddress,ProductService productService){
        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(shippingAddress);
        

        return order;
    }
}
