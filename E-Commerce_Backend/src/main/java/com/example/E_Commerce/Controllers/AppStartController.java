package com.example.E_Commerce.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppStartController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {

        try {
            // DB readiness check
            jdbcTemplate.execute("SELECT 1");

            return ResponseEntity.ok("READY");

        } catch (Exception e) {
            return ResponseEntity.status(503).body("NOT_READY");
        }
    }
}