import { Cliente } from "./cliente";
import { Servicio } from "./servicio";

export interface Reserva {
    id?: string;
    fecha?: string;
    detalles?: string;
    cliente?: Cliente;
    servicio?:Servicio;
}
