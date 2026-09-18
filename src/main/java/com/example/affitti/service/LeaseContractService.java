package com.example.affitti.service;

import com.example.affitti.model.*;
import com.example.affitti.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class LeaseContractService {

    private final LeaseContractRepository contractRepository;
    private final PropertyRepository propertyRepository;
    private final PaymentRepository paymentRepository;

    public LeaseContractService(LeaseContractRepository contractRepository,
                                PropertyRepository propertyRepository,
                                PaymentRepository paymentRepository) {
        this.contractRepository = contractRepository;
        this.propertyRepository = propertyRepository;
        this.paymentRepository = paymentRepository;
    }

    @Transactional
    public LeaseContract createContract(LeaseContract contract) {
        // 1. Recupera l'immobile aggiornato
        Property property = propertyRepository.findById(contract.getProperty().getId())
                .orElseThrow(() -> new RuntimeException("Immobile non trovato"));

        if (property.getStatus() == PropertyStatus.RENTED) {
            throw new IllegalStateException("L'immobile è già affittato!");
        }

        // 2. Imposta l'immobile come AFFITTATO
        property.setStatus(PropertyStatus.RENTED);
        propertyRepository.save(property);

        // 3. Salva il contratto
        LeaseContract savedContract = contractRepository.save(contract);

        // 4. Genera in automatico i PaymentService mensili
        generatePaymentsForContract(savedContract);

        return savedContract;
    }

    private void generatePaymentsForContract(LeaseContract contract) {
        LocalDate currentDate = contract.getStartDate();
        LocalDate endDate = contract.getEndDate();

        while (!currentDate.isAfter(endDate)) {
            Payment payment = new Payment();
            payment.setContract(contract);
            payment.setAmount(contract.getMonthlyRent());
            payment.setDueDate(currentDate);
            payment.setStatus(PaymentStatus.PENDING); // Stato iniziale: In attesa di pagamento

            paymentRepository.save(payment);

            // Avanza al mese successivo
            currentDate = currentDate.plusMonths(1);
        }
    }

    public List<LeaseContract> getAllContracts() {
        return contractRepository.findAll();
    }
}