import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../api/reserva';
import { Observable } from 'rxjs';
import { SigninRequest, Usuario } from '../api/cliente';

@Injectable()
export class AuthService {

    private baseUrl = 'http://localhost:3000/api/v1/auth';
    constructor(private http: HttpClient) { }


    signup(signUpRequest: Usuario): Observable<any> {
        return this.http.post<Reserva>(`${this.baseUrl}/registro`, signUpRequest);
    }

    signin(signinRequest: SigninRequest): Observable<any> {
        return this.http.post<Reserva>(`${this.baseUrl}/login`, signinRequest);
    }


    isLoggedIn(): boolean {      
        return !!localStorage.getItem('authToken');
    }


}
