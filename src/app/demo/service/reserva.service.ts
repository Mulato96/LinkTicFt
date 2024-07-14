import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../api/reserva';
import { Observable } from 'rxjs';

@Injectable()
export class ReservaService {

    private baseUrl = 'http://localhost:3000/api/reservas';
    constructor(private http: HttpClient) { }


    crearReserva(reserva: Reserva): Observable<Reserva> {
        return this.http.post<Reserva>(`${this.baseUrl}`, reserva);
    }

    obtenerReservas(): Observable<any> {
        return this.http.get<Reserva[]>(`${this.baseUrl}`);
    }

    actualizarReserva(id: number, reserva: Reserva): Observable<Reserva> {
        return this.http.put<Reserva>(`${this.baseUrl}/${id}`, reserva);
    }

    eliminarReserva(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

}
