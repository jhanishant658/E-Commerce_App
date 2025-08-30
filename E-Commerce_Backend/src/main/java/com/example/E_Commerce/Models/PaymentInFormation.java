package com.example.E_Commerce.Models;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentInFormation {
@Column(name ="Card_Number")
    private String cardnumber;
    @Column(name ="Card_Holder_Name")
    private String cardholdername;
    @Column(name ="Expiry_Date")
    private String expirydate;
    @Column(name ="CVV")
    private String cvv;
   
    
}
