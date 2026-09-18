package com.example.affitti.controller;

import com.example.affitti.model.LeaseContract;
import com.example.affitti.service.LeaseContractService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contracts")
@CrossOrigin(origins = "http://localhost:4200")
public class LeaseContractController {

    private final LeaseContractService contractService;

    public LeaseContractController(LeaseContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping
    public List<LeaseContract> getAllContracts() {
        return contractService.getAllContracts();
    }

    @PostMapping
    public ResponseEntity<LeaseContract> createContract(@RequestBody LeaseContract contract) {
        return ResponseEntity.ok(contractService.createContract(contract));
    }
}