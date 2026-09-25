import { Component, signal } from '@angular/core';

import { PropertyListComponent } from './components/property-list/property-list';
import { TenantListComponent } from './components/tenant-list/tenant-list';
import { ContractListComponent } from './components/contract-list/contract-list';
import { PaymentListComponent } from './components/payment-list/payment-list';// o property-list.component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PropertyListComponent, TenantListComponent, ContractListComponent, PaymentListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
