import { Component, ElementRef } from '@angular/core'; // <-- Aggiungi ElementRef qui
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property.service';

export interface ExtendedProperty {
  title: string;
  description: string;
  propertyType: string;
  squareMeters: number | null;
  rooms: number | null;
  bathrooms: number | null;
  address: string;
  city: string;
  monthlyRent: number | null;
  condoFees?: number | null;
  deposit?: number | null;
  availableFrom?: string;
  isFurnished: boolean;
  hasElevator: boolean;
  hasBalcony: boolean;
  petsAllowed: boolean;
  status: string;
}

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-property.html',
  styleUrl: './create-property.css'
})
export class CreatePropertyComponent {
  newProperty: ExtendedProperty = {
    title: '',
    description: '',
    propertyType: 'Bilocale',
    squareMeters: null,
    rooms: 1,
    bathrooms: 1,
    address: '',
    city: '',
    monthlyRent: null,
    condoFees: null,
    deposit: null,
    availableFrom: '',
    isFurnished: false,
    hasElevator: false,
    hasBalcony: false,
    petsAllowed: false,
    status: 'AVAILABLE'
  };

  selectedFiles: File[] = [];
  imagePreviews: string[] = [];

  submitted = false;
  imageError = false;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private el: ElementRef
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
    }
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private addFiles(files: File[]): void {
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length > 0) {
      this.imageError = false;
    }
    this.selectedFiles.push(...validFiles);

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
    if (this.selectedFiles.length === 0 && this.submitted) {
      this.imageError = true;
    }
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    // Controllo se mancano foto
    if (this.selectedFiles.length === 0) {
      this.imageError = true;
    }

    // Se la form non è valida o mancano foto, scopri il primo campo non valido e fai uno scroll visivo
    if (form.invalid || this.imageError) {
      setTimeout(() => {
        const firstInvalidControl = this.el.nativeElement.querySelector('.is-invalid, .dropzone-invalid');
        if (firstInvalidControl) {
          firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (typeof firstInvalidControl.focus === 'function') {
            firstInvalidControl.focus();
          }
        }
      }, 50);
      return;
    }

    // Se tutti i dati sono validi, invia
    const formData = new FormData();
    formData.append('property', JSON.stringify(this.newProperty));

    this.selectedFiles.forEach((file) => {
      formData.append('images', file, file.name);
    });

    this.propertyService.createProperty(formData as any).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => console.error('Errore durante la pubblicazione:', err)
    });
  }
}
