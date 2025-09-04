package com.example.E_Commerce.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.E_Commerce.Models.Address;
import com.example.E_Commerce.Repositories.AddressRepository;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;
    public Address createAddress(Address address){
        return addressRepository.save(address);
    }
}
