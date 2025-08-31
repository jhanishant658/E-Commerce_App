package com.example.E_Commerce.Models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    @JsonIgnore
    @ManyToOne
    private Order order;
      @JsonIgnore
    @ManyToOne
    private Product product;
    private String size ;
    private int quantity;
    private double price;
    private double discountedPrice;
    private long userId;
    private LocalDateTime deliveryDate; ;

}
