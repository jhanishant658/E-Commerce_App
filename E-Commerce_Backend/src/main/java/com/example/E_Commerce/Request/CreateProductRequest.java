package com.example.E_Commerce.Request;

import java.util.HashSet;
import java.util.Set;


import lombok.Getter;
import lombok.Setter;
import com.example.E_Commerce.Models.Size;
@Getter
@Setter
public class CreateProductRequest {
    private String title;
    private String description;
    private double price;
    private double discountedPrice;
    private String discountpercent;
    private int quantity;
    private String brand ;
    private String color;
    private Set<Size> sizes = new HashSet<>(); 
    private String imageUrl;
    private String firstlevelCategory;
    private String secondlevelCategory;
    private String thirdlevelCategory; 
    private int stock;
}