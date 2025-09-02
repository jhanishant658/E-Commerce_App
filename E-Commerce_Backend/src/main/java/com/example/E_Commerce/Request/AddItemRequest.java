package com.example.E_Commerce.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class AddItemRequest {
    private Long productId;
    private String size ;
    private int quantity;
    private Integer price;

}
