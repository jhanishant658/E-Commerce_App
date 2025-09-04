package com.example.E_Commerce.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.E_Commerce.Models.Category;
import com.example.E_Commerce.Models.Product;
import com.example.E_Commerce.Repositories.CategoryRepository;
import com.example.E_Commerce.Repositories.ProductRepository;
import com.example.E_Commerce.Request.CreateProductRequest;

import java.util.ArrayList;
import java.util.Collections;


@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    public ResponseEntity<Product> createProduct(CreateProductRequest request){ 

        try {
            Category topCategory = categoryRepository.findByName(request.getFirstlevelCategory());
            if(topCategory == null){
                Category newCategory = new Category();
                newCategory.setName(request.getFirstlevelCategory());
                newCategory.setParentCategory(null);
                newCategory.setLevel(1);
                topCategory = categoryRepository.save(newCategory);
            }
            Category subCategory = categoryRepository.findByNameAndParentCategory(request.getSecondlevelCategory() , topCategory);
            if(subCategory == null){
                Category newSubCategory = new Category();
                newSubCategory.setName(request.getSecondlevelCategory());
                newSubCategory.setParentCategory(topCategory);
                newSubCategory.setLevel(2);
                subCategory = categoryRepository.save(newSubCategory);
            }
            Category thirdCategory = categoryRepository.findByNameAndParentCategory(request.getThirdlevelCategory() , subCategory);
            if(thirdCategory == null){
                Category newThirdCategory = new Category();
                newThirdCategory.setName(request.getThirdlevelCategory());
                newThirdCategory.setParentCategory(subCategory);
                newThirdCategory.setLevel(3);
                thirdCategory = categoryRepository.save(newThirdCategory);
            }
            Product product = new Product();
            product.setTitle(request.getTitle());
            product.setDescription(request.getDescription());
            product.setPrice(request.getPrice());
            product.setDiscountedPrice(request.getDiscountedPrice());
            product.setDiscountpercent(request.getDiscountpercent());
            product.setQuantity(request.getQuantity());
            product.setBrand(request.getBrand());
            product.setColor(request.getColor());
            product.setSizes(request.getSizes());
            product.setImageUrl(request.getImageUrl());
            product.setCategory(thirdCategory);
            product.setStock(request.getStock());
            product.setCreatedAt(java.time.LocalDateTime.now());
            Product savedProduct = productRepository.save(product);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            System.out.println("Error creating product: " + e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
        
    }

    public Product getProductById(Long id){
        try {
            Product product = productRepository.findById(id).orElse(null);
            
            if (product == null) {
                return null;
            }
            if(product.getStock() <= 0){
                 System.out.println("Product is out of stock");
                return null;
            }
            return product;
        } catch (Exception e) {
            System.out.println("Error retrieving product: " + e.getMessage());
            return null;
        }
    }
    public ResponseEntity<String> deleteProductById(Long id){
        try {
            Product product = productRepository.findById(id).orElse(null);
            if (product == null) {
                return ResponseEntity.notFound().build();
            }
            productRepository.deleteById(id);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (Exception e) {
            System.out.println("Error deleting product: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }
     public ResponseEntity<Product> updateProductById(Long id, Product updatedProduct){
        try {
            Product product = productRepository.findById(id).orElse(null);
            if (product == null) {
                return ResponseEntity.notFound().build();
            }
            product.setTitle(updatedProduct.getTitle());
            product.setDescription(updatedProduct.getDescription());
            product.setPrice(updatedProduct.getPrice());
            product.setDiscountedPrice(updatedProduct.getDiscountedPrice());
            product.setDiscountpercent(updatedProduct.getDiscountpercent());
            product.setQuantity(updatedProduct.getQuantity());
            product.setBrand(updatedProduct.getBrand());
            product.setColor(updatedProduct.getColor());
            product.setSizes(updatedProduct.getSizes());
            product.setImageUrl(updatedProduct.getImageUrl());
            product.setCategory(updatedProduct.getCategory());
            product.setStock(updatedProduct.getStock());
            productRepository.save(product);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            System.out.println("Error updating product: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }
   public ResponseEntity<List<Product>> getProductByCategory(String categoryName) {
    try {
        Category category = categoryRepository.findByName(categoryName);

        if (category == null) {
            System.out.println("Category Not Found");
            return ResponseEntity.notFound().build(); // category hi nahi mili
        }

        List<Product> products = productRepository.findByCategory(category);

        if (products == null || products.isEmpty()) {
            System.out.println("Product Not Found");
            return ResponseEntity.notFound().build(); // category mili but product nahi
        }

        return ResponseEntity.ok(products);

    } catch (Exception e) {
        System.out.println("Error retrieving products: " + e.getMessage());
        return ResponseEntity.status(500).build();
    }
}

   public ResponseEntity<List<Product>> filterProducts(String category, List<String> colors, Integer minPrice, Integer maxPrice,
     Integer minDiscount, Integer maxDiscount, String sortBy) {

    try {
        List<Product> products = new ArrayList<>();

        if (colors == null || colors.isEmpty()) {
            colors = List.of((String) null); // null for all colors
        }

        for (String color : colors) {
            List<Product> colorFiltered = productRepository.filterProducts(category, color, minPrice, maxPrice);
            
            // Discount filter backend me
            for (Product p : colorFiltered) {
                int discount = Integer.parseInt(p.getDiscountpercent().replace("%",""));
                if ((minDiscount == null || discount >= minDiscount) &&
                    (maxDiscount == null || discount <= maxDiscount)) {
                    products.add(p);
                }
            }
        }

        // Sorting
        Collections.sort(products, (p1, p2) -> {
            switch (sortBy) {
                case "priceAsc":
                    return Double.compare(p1.getDiscountedPrice(), p2.getDiscountedPrice());
                case "priceDesc":
                    return Double.compare(p2.getDiscountedPrice(), p1.getDiscountedPrice());
                case "discountAsc":
                    return Integer.compare(
                        Integer.parseInt(p1.getDiscountpercent().replace("%","")),
                        Integer.parseInt(p2.getDiscountpercent().replace("%",""))
                    );
                case "discountDesc":
                    return Integer.compare(
                        Integer.parseInt(p2.getDiscountpercent().replace("%","")),
                        Integer.parseInt(p1.getDiscountpercent().replace("%",""))
                    );
                default:
                    return 0;
            }
        });

        if (products.isEmpty()) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(products);

    } catch (Exception e) {
        System.out.println("Error filtering products: " + e.getMessage());
        return ResponseEntity.status(500).build();
    }
}

}
