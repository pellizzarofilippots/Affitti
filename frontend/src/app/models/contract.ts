import { Property } from './property';
import { Tenant } from './tenant';

export interface LeaseContract {
  id?: number;
  property: Partial<Property>;
  tenant: Partial<Tenant>;
  startDate: string;
  endDate: string;
  monthlyRent: number;
}
