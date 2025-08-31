package com.example.E_Commerce.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.E_Commerce.Models.Order;
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
}
