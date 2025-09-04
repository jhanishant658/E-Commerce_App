package com.example.E_Commerce.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.E_Commerce.Models.Address;

public interface AddressRepository extends JpaRepository<Address ,Long> {
    
}
