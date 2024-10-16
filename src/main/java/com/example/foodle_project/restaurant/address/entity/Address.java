package com.example.foodle_project.restaurant.address.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "addresses") // 테이블 이름 정의
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;//
    private String street; // 거리
    private String city;   // 도시
    private String state;  // 주/도
    private String zipCode; // 우편번호


    // 기본 생성자
    public Address() {}

    // 생성자
    public Address(String street, String city, String state, String zipCode) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

}