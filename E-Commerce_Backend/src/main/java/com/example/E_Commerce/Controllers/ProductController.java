package com.example.E_Commerce.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.E_Commerce.Models.Product;
import com.example.E_Commerce.Request.CreateProductRequest;
import com.example.E_Commerce.Services.ProductService;

@RestController

public class ProductController {
    @Autowired
    private ProductService productService;
    @PostMapping("/admin/products")
    public ResponseEntity<Product> createProduct(CreateProductRequest request) {
        return productService.CreateProduct(request);
    }
   @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(Long id) {
        // Implementation for retrieving a product by ID
        return productService.getProductById(id);
    }
 @PutMapping("/admin/products/{id}")
    public ResponseEntity<Product> updateProduct(Long id, Product request) {
        // Implementation for updating a product
        return productService.updateProductById(id, request);
    }
@DeleteMapping("/admin/products/{id}")
    public ResponseEntity<String> deleteProduct(Long id) {
        // Implementation for deleting a product
        return productService.deleteProductById(id);
    }
    @GetMapping("/products/category/{categoryName}")
    public ResponseEntity<List<Product>> getProductByCategory(String categoryName) {
        // Implementation for retrieving products by category
        return productService.getProductByCategory(categoryName);
    }
    @GetMapping("/products/filter")
    public ResponseEntity<List<Product>> filterProducts(
        @RequestParam(required = false) String category,
        @RequestParam(required = false) List<String> colors,
        @RequestParam(required = false) Integer minPrice,
        @RequestParam(required = false) Integer maxPrice,
        @RequestParam(required = false) Integer minDiscount,
        @RequestParam(required = false) Integer maxDiscount,
        @RequestParam(required = false) String sortBy
) {
    return productService.filterProducts(category, colors, minPrice, maxPrice, minDiscount, maxDiscount, sortBy);
}

}
