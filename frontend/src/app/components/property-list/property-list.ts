import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <-- 1. IMPORTA RouterLink

import { PropertyService } from '../../services/property.service';
import { AuthService } from '../../services/auth.service';
import { Property } from '../../models/property';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink // <-- 2. AGGIUNGILO QUI
  ],
  templateUrl: './property-list.html',
  styleUrl: './property-list.css'
})
export class PropertyListComponent implements OnInit {
  properties = signal<Property[]>([]);
  newProperty: Property = {
    title: '',
    description: '',
    squareMeters: 0,
    imageUrl: '',
    address: '',
    city: '',
    monthlyRent: 0,
    status: 'AVAILABLE'
  };

  constructor(
    private propertyService: PropertyService,
    public authService: AuthService

  ) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.propertyService.getProperties().subscribe({
      next: (data) => {
        // Aggiorniamo il signal: l'HTML si aggiornerà DA SOLO all'istante
        this.properties.set(data);
      }
    });
  }

  onSubmit(): void {
    this.propertyService.createProperty(this.newProperty).subscribe({
      next: () => {
        this.loadProperties();
        this.resetForm();
      },
      error: (err) => console.error('Errore durante il salvataggio:', err)
    });
  }

  private resetForm(): void {
    this.newProperty = {
      title: '',
      description: '',
      squareMeters: 0,
      imageUrl: '',
      address: '',
      city: '',
      monthlyRent: 0,
      status: 'AVAILABLE'
    };
  }
}
