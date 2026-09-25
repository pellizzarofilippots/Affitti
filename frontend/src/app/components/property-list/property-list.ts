import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-list.html',
  styleUrl: './property-list.css'
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
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

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.propertyService.getProperties().subscribe({
      next: (data) => this.properties = data,
      error: (err) => console.error('Errore nel recupero dati:', err)
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
