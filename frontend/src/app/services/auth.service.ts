import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: 'LOCATORE' | 'AFFITTUARIO';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  // Mantiene lo stato dell'utente reattivo in memoria
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private getUserFromStorage(): User | null {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user).pipe(
      tap(newUser => this.handleAuthSuccess(newUser))
    );
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => this.handleAuthSuccess(user))
    );
  }

  private handleAuthSuccess(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (user.id) {
      localStorage.setItem('userId', user.id.toString());
    }
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  isLocatore(): boolean {
    return this.getCurrentUser()?.role === 'LOCATORE';
  }

  isAffittuario(): boolean {
    return this.getCurrentUser()?.role === 'AFFITTUARIO';
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
