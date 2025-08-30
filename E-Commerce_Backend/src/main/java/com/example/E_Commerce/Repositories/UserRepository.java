package com.example.E_Commerce.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.E_Commerce.Models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
   public User findByEmail(String email);
   
 
}
