import { Cliente } from "./cliente";
import { Servicio } from "./servicio";

export interface Reserva {
    id?: number;
    fecha?: string;
    detalles?: string;
    cliente?: Cliente;
    servicio?:Servicio;
    clientnew?:boolean;   
}
