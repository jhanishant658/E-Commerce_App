package com.example.E_Commerce.Models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Product {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;
@Column(name ="title")
private String title;
@Column(name ="description")
private String description;
@Column(name ="price")
private double price;
@Column(name ="discounted_price")
private double discountedPrice;
@Column(name ="discount_percentage")
private String discountpercent;
@Column(name ="quantity")
private int quantity;
private String brand ;
private String color;

@ElementCollection
@Column(name ="sizes")
private Set<Size> sizes = new HashSet<>();
@Column(name ="image_url")
private String imageUrl;
@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Rating> ratings = new ArrayList<>();
@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Review> reviews = new ArrayList<>();
@Column(name ="number_of_ratings")
private int numberOfRatings;
@ManyToOne
@JoinColumn(name = "category_id")
private Category category;
@Column(name ="stock")
private int stock;
@Column(name = "Created_At")

private LocalDateTime createdAt;


}
