package com.example.E_Commerce.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.E_Commerce.Models.Address;
import com.example.E_Commerce.Models.Order;
import com.example.E_Commerce.Models.OrderItem;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Models.Cart;
import com.example.E_Commerce.Repositories.AddressRepository;
import com.example.E_Commerce.Repositories.CartRepository;
import com.example.E_Commerce.Repositories.OrderRepository;

import java.time.LocalDateTime;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private CartService cartService;
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

   @Autowired
   private AddressRepository addressRepository;
    // Place an order for a user
    public Order placeOrder(User user, Address shippingAddress) {
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null || cart.getCartItems().isEmpty()) {
            throw new IllegalStateException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        Address savedAddress = addressRepository.save(shippingAddress);
         order.setShippingAddress(savedAddress);
        order.setShippingAddress(shippingAddress);
      List<OrderItem> orderItems = cart.getCartItems()
        .stream()
        .map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setSize(cartItem.getSize());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            orderItem.setDiscountedPrice(cartItem.getDiscountedPrice());
            orderItem.setUserId((long) cartItem.getUserId()); // cast if userId is double in CartItem
            orderItem.setOrder(order); // important for mapping
            return orderItem;
        })
        .collect(Collectors.toList());

order.setOrderItems(orderItems);

        order.setTotalAmount(cart.getTotalPrice());
        order.setOrderstatus("PLACED");
        order.setCreatedAt(LocalDateTime.now());

        Order savedOrder = orderRepository.save(order);

        // Clear cart after placing order
        cartService.deleteCartItem(user.getId());

        return savedOrder;
    }

    // Admin: Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // User: Get orders by user
    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }

    // Get order by ID (for details)
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
    }

    // Admin: Update order status
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = getOrderById(orderId);
        order.setOrderstatus(status);
        return orderRepository.save(order);
    }
}