export interface Cliente {
    id?: number;
    nombre?: string;
    apellido?: string;
    telefono?: string;
    email?: string;    
}

export interface SigninRequest {
    email?: string;
    password?: string;
}

export interface Usuario {  
    id?: number;  
    nombre?: string;
    apellido?: string;
    telefono?: string;
    email?: string;
    password?: string;
}