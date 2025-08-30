package com.example.E_Commerce.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.E_Commerce.Models.User;

public interface UserRepository extends JpaRepository<User, Long> {
   public User findByEmail(String email);
   
 
}
