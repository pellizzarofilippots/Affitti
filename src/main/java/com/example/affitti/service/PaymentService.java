package com.example.affitti.service;

import com.example.affitti.model.Payment;
import com.example.affitti.model.PaymentStatus;
import com.example.affitti.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment markAsPaid(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Rata non trovata"));
        payment.setStatus(PaymentStatus.PAID);
        return paymentRepository.save(payment);
    }
}