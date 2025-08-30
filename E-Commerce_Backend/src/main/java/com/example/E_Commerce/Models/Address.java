package com.example.E_Commerce.Models;

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
public class Address {
     @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name ="First_Name")
    private String firstname;
    @Column(name ="Last_Name")
    private String lastname;
    @Column(name ="Street_Address")
    private String streetaddress;
    @Column(name ="City")
    private String city;
    @Column(name ="State")
    private String state;
    @Column(name ="Zip_Code")
    private String zipcode;
    @Column(name ="Country")
    private String country;
    @Column(name ="Mobile")
    private String mobile;
   @ManyToOne
   @JsonIgnore
   @JoinColumn(name = "user_id")
    private User user;
  
}
