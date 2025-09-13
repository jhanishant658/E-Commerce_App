package com.example.E_Commerce.Response;

import java.util.List;

import com.example.E_Commerce.Models.Order;
import com.example.E_Commerce.Models.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Order order;
    private List<Product> product;
}
