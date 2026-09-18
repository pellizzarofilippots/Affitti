package com.example.affitti.repository;

import com.example.affitti.model.Property;
import com.example.affitti.model.PropertyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    // Usa PropertyStatus direttamente, senza Property.
    List<Property> findByStatus(PropertyStatus status);
}