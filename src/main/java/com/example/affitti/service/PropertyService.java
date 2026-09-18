package com.example.affitti.service;

import com.example.affitti.model.Property;
import com.example.affitti.model.PropertyStatus;
import com.example.affitti.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public List<Property> getAvailableProperties() {
        // Usa direttamente PropertyStatus.AVAILABLE
        return propertyRepository.findByStatus(PropertyStatus.AVAILABLE);
    }

    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Immobile non trovato con ID: " + id));
    }
}