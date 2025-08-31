package com.example.E_Commerce.Models;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @OneToMany(mappedBy = "cart", cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
    @Column(name ="cart_items")
    private Set<CartItem> cartItems = new java.util.HashSet<>();
     @Column(name ="total_price")
     private double totalPrice;
     @Column(name ="total_items")
        private int totalItems;
        private int totalDiscount;
        private int discountedPrice;
    
}
