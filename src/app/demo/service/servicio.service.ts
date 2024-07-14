import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../api/servicio';

@Injectable()
export class ServicioService {

    private baseUrl = 'http://localhost:3000/api/servicios';
    constructor(private http: HttpClient) { }


    crearServicio(servicio: Servicio): Observable<Servicio> {
        return this.http.post<Servicio>(`${this.baseUrl}`, servicio);
    }

    obtenerServicios(): Observable<any> {
        return this.http.get<Servicio[]>(`${this.baseUrl}`);
    }

    actualizarServicio(id: number | undefined, servicio: Servicio): Observable<Servicio> {
        return this.http.put<Servicio>(`${this.baseUrl}/${id}`, servicio);
    }

    eliminarServicio(id: number | undefined): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

}
