import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PropertyListComponent } from './components/property-list/property-list';
import { TenantListComponent } from './components/tenant-list/tenant-list';
import { ContractListComponent } from './components/contract-list/contract-list';
import { PaymentListComponent } from './components/payment-list/payment-list';
import { AuthService, User } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PropertyListComponent,
    TenantListComponent,
    ContractListComponent,
    PaymentListComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  private authService = inject(AuthService);

  currentUser: User | null = null;
  isRegistering = true;

  // Campi per il Form
  name = '';
  email = '';
  password = '';
  role: 'LOCATORE' | 'AFFITTUARIO' = 'AFFITTUARIO';

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  onRegister(): void {
    const newUser: User = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(newUser).subscribe({
      next: (user) => {
        this.authService.setCurrentUser(user);
        this.currentUser = user;
      },
      error: (err) => alert('Errore registrazione: ' + (err.error || 'Server non raggiungibile'))
    });
  }

  onLogin(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (user) => {
        this.authService.setCurrentUser(user);
        this.currentUser = user;
      },
      error: () => alert('Credenziali non valide')
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.currentUser = null;
  }
}
