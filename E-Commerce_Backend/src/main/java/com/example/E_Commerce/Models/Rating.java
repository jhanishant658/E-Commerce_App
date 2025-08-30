package com.example.E_Commerce.Models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Rating {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;
@ManyToOne
@JoinColumn(name = "user_id" , nullable = false)
private User user;
@ManyToOne
@JsonIgnore
@JoinColumn(name = "product_id" , nullable = false)
private Product product;
@Column(name ="Rating")
private int rating;
private LocalDateTime createdAt;

}
