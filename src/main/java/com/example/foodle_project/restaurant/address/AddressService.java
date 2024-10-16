package com.example.foodle_project.restaurant.address;

import com.example.foodle_project.restaurant.address.entity.Address;
import com.example.foodle_project.restaurant.address.repo.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class AddressService {
    private AddressRepository addressRepository;


    // 주소 추가
    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }

    // 주소 목록 조회
    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }


    public Address getAddressById(Long id) {
        return addressRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Address not found with ID: " + id));
    }

    public void deleteAddress(Long id) {
        Address address = getAddressById(id);
        addressRepository.delete(address);
    }
}
