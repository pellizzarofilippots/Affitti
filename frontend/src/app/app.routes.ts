import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { PropertyListComponent } from './components/property-list/property-list';
import { CreatePropertyComponent } from './components/create-property/create-property';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: PropertyListComponent, canActivate: [authGuard] },
  { path: 'create-property', component: CreatePropertyComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
