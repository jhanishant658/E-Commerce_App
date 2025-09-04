package com.example.E_Commerce.Models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders") 
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name ="order_id", unique = true)
    private String orderId ;
    @ManyToOne
    private User user;
    @OneToMany(mappedBy = "order",cascade = jakarta.persistence.CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();
    private LocalDateTime orderDate;

    private LocalDateTime deliveryDate;
    private String Orderstatus; // e.g., "Pending", "Shipped", "Delivered"
    private double totalAmount;
    @OneToOne
    private Address shippingAddress;
    @Embedded
private PaymentDetails paymentDetails = new PaymentDetails();
private Integer totalDiscount;
private Integer totalItems;
private LocalDateTime createdAt ; 


    
}
