package com.example.E_Commerce.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppStartController {
    @GetMapping("/runApp")
    public String runApp(){
        return "OK" ;
    }
}
