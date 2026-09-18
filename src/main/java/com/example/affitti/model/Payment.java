package com.example.affitti.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "contract_id", nullable = false)
    private LeaseContract contract;

    private BigDecimal amount;
    private LocalDate dueDate;   // Data di scadenza
    private LocalDate paidDate;  // Data effettivo pagamento

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;


}