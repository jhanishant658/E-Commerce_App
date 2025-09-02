package com.example.E_Commerce.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
   @Id
   @GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
   private Long id;
   @ManyToOne
   @JsonIgnore
   private Cart cart;
   private Product product;
    private String size;
    private int quantity;
    private double price;
    private double discountedPrice;
    private double userId ; 
}
