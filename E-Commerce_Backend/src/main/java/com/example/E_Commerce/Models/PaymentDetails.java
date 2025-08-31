package com.example.E_Commerce.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDetails {
  private String paymentMethod; 
  private String paymentStatus;
    private String paymentId;
    private String razorpayLinkId;
    private String razorpayLinkRefferenceId;
    private String razorpayLinkStatus;
    private String razorPaymentId;


}
