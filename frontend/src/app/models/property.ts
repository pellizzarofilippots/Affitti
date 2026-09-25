export interface Property {
  id?: number;
  title: string;
  description: string;
  squareMeters: number;
  imageUrl: string;
  address: string;
  city: string;
  monthlyRent: number;
  status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
}
