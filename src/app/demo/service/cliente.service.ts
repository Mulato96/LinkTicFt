import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../api/cliente';

@Injectable()
export class ClienteService {

    private baseUrl = 'http://localhost:3000/api/clientes';
    constructor(private http: HttpClient) { }



    crearCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(`${this.baseUrl}`, cliente);
    }


    obtenerClientes(): Observable<any> {
        return this.http.get<Cliente[]>(`${this.baseUrl}`);
    }

    actualizarCliente(id: number | undefined, cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(`${this.baseUrl}/${id}`, cliente);
    }

    eliminarCliente(id: number | undefined): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

}
