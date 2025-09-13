package com.example.E_Commerce.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.E_Commerce.Models.Address;
import com.example.E_Commerce.Models.Order;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Services.OrderService;
import com.example.E_Commerce.Services.UserService;


@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService ;
    @Autowired
    private UserService userService ; 
    @PostMapping("/{userId}")
    public Order placeOrder(@PathVariable Long userId , @RequestBody Address shippingAddress){
       User user = userService.getUserById(userId);
         return orderService.placeOrder(user, shippingAddress);
    }
    @GetMapping("/getAllOrder")
    public List<Order> getAllOrders(){
        return orderService.getAllOrders();
    }
    @GetMapping("/orderhistory/{userId}")
    public List<Order> orderHistory(@PathVariable Long userId){
        return orderService.getOrdersByUser(userService.getUserById(userId));
    }
    @GetMapping("orderDetail/{orderId}")
    public Order getOrderDetails(@PathVariable Long orderid){
        return orderService.getOrderById(orderid);
    }
    @PatchMapping("/updateOrder/{orderId}/{OrderStatus}")
    public Order updateOrderStatus(@PathVariable Long orderId ,@PathVariable String OrderStatus){
        return orderService.updateOrderStatus(orderId, OrderStatus);
    }
    @DeleteMapping("/cancelOrder/{orderid}")
    public void  cancelOrder( @PathVariable Long  orderid){
         orderService.CancelOrder(orderid);
    }
}
