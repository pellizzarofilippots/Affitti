import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaseContract } from '../models/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = 'http://localhost:8080/api/contracts';

  constructor(private http: HttpClient) {}

  getContracts(): Observable<LeaseContract[]> {
    return this.http.get<LeaseContract[]>(this.apiUrl);
  }

  createContract(contract: LeaseContract): Observable<LeaseContract> {
    return this.http.post<LeaseContract>(this.apiUrl, contract);
  }
}
