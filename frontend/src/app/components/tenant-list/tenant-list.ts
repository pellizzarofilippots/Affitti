import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../models/tenant';

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tenant-list.html',
  styleUrl: './tenant-list.css'
})
export class TenantListComponent implements OnInit {
  tenants: Tenant[] = [];
  newTenant: Tenant = { firstName: '', lastName: '', email: '', phoneNumber: '', taxCode: '' };

  constructor(private tenantService: TenantService) {}

  ngOnInit(): void {
    this.loadTenants();
  }

  loadTenants(): void {
    this.tenantService.getTenants().subscribe({
      next: (data) => this.tenants = data,
      error: (err) => console.error('Errore caricamento inquilini:', err)
    });
  }

  onSubmit(): void {
    this.tenantService.createTenant(this.newTenant).subscribe({
      next: () => {
        this.loadTenants();
        this.newTenant = { firstName: '', lastName: '', email: '', phoneNumber: '', taxCode: '' };
      },
      error: (err) => console.error('Errore salvataggio inquilino:', err)
    });
  }
}
