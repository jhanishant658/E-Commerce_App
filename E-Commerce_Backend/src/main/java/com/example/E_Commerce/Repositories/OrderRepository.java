package com.example.E_Commerce.Repositories;

import com.example.E_Commerce.Models.Order;
import com.example.E_Commerce.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}