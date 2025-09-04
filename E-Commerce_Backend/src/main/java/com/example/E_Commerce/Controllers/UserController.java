package com.example.E_Commerce.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Request.LoginRequest;
import com.example.E_Commerce.Response.AuthResponse;
import com.example.E_Commerce.Services.UserService;

@RestController
@RequestMapping("/auth")
public class UserController {
    
    @Autowired
    private UserService userService;
 @PostMapping("/signup")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody User user) {
        // Registration logic here
        return  userService.registerUser(user);
    }
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        
        return userService.loginUser(loginRequest);
        
}

}