package com.example.E_Commerce.Services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.E_Commerce.Configurations.JwtProvider;
import com.example.E_Commerce.Models.User;
import com.example.E_Commerce.Repositories.UserRepository;
import com.example.E_Commerce.Request.LoginRequest;
import com.example.E_Commerce.Response.AuthResponse;

@Service
public class UserService {
 @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;
public ResponseEntity<AuthResponse> registerUser(User user) {
    System.out.println("Inside registerUser");
    System.out.println("Firstname: " + user.getFirstname());
    System.out.println("Lastname: " + user.getLastname());
    System.out.println("Email: " + user.getEmail());
    System.out.println("Password: " + user.getPassword());

    if (userRepository.findByEmail(user.getEmail()) != null) {
        System.out.println("Duplicate Email Found");
        return ResponseEntity.badRequest().body(new AuthResponse("Email is already in use", null));
    }

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setCreatedAt(java.time.LocalDateTime.now());
    userRepository.save(user);

    String token = jwtProvider.generateToken(
        new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
    );
    System.out.println("Generated Token: " + token);

    return ResponseEntity.ok(new AuthResponse("User registered successfully", token));
}

    public ResponseEntity<AuthResponse> loginUser(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        User user = userRepository.findByEmail(email);
        if(user == null){
            return ResponseEntity.badRequest().body(new AuthResponse("User not found", null));
        }
        if(!passwordEncoder.matches(password, user.getPassword())){
            return ResponseEntity.badRequest().body(new AuthResponse("Invalid credentials", null)); 
        }
        Authentication auth = new UsernamePasswordAuthenticationToken(email, password);
        String token = jwtProvider.generateToken(auth);
        return ResponseEntity.ok(new AuthResponse("User logged in successfully", token));
    }
    
}
