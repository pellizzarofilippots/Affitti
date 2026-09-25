import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContractService } from '../../services/contract.service';
import { PropertyService } from '../../services/property.service';
import { TenantService } from '../../services/tenant.service';
import { LeaseContract } from '../../models/contract';
import { Property } from '../../models/property';
import { Tenant } from '../../models/tenant';

@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contract-list.html',
  styleUrl: './contract-list.css'
})
export class ContractListComponent implements OnInit {
  contracts: LeaseContract[] = [];
  availableProperties: Property[] = [];
  tenants: Tenant[] = [];

  selectedPropertyId: number | null = null;
  selectedTenantId: number | null = null;

  newContract: LeaseContract = {
    property: {},
    tenant: {},
    startDate: '',
    endDate: '',
    monthlyRent: 0
  };

  constructor(
    private contractService: ContractService,
    private propertyService: PropertyService,
    private tenantService: TenantService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.contractService.getContracts().subscribe(data => this.contracts = data);

    // Carica gli immobili e filtra solo quelli DISPONIBILI
    this.propertyService.getProperties().subscribe(data => {
      this.availableProperties = data.filter(p => p.status === 'AVAILABLE');
    });

    this.tenantService.getTenants().subscribe(data => this.tenants = data);
  }

  onSubmit(): void {
    if (!this.selectedPropertyId || !this.selectedTenantId) return;

    this.newContract.property = { id: Number(this.selectedPropertyId) };
    this.newContract.tenant = { id: Number(this.selectedTenantId) };

    this.contractService.createContract(this.newContract).subscribe({
      next: () => {
        this.loadData();
        this.resetForm();
      },
      error: (err) => alert('Errore: ' + (err.error?.message || 'Impossibile creare il contratto'))
    });
  }

  resetForm(): void {
    this.selectedPropertyId = null;
    this.selectedTenantId = null;
    this.newContract = { property: {}, tenant: {}, startDate: '', endDate: '', monthlyRent: 0 };
  }
}
