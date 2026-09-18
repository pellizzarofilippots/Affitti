package com.example.affitti.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Campi Annuncio
    private String title;

    @Column(length = 1000)
    private String description;

    private Integer squareMeters;
    private String imageUrl;

    // Campi Base
    private String address;
    private String city;
    private BigDecimal monthlyRent;

    // <-- AGGIUNGI QUESTO CAMPO
    @Enumerated(EnumType.STRING)
    private PropertyStatus status;}