import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Reserva } from '../../api/reserva';
import { ReservaService } from '../../service/reserva.service';
import { Cliente } from '../../api/cliente';
import { Servicio } from '../../api/servicio';
import { ClienteService } from '../../service/cliente.service';
import { ServicioService } from '../../service/servicio.service';


/**
 * Componente para gestionar reservas.
 * Permite listar, agregar, editar y eliminar reservas.
 */

@Component({
    templateUrl: './reservas.component.html',
    providers: [MessageService, ConfirmationService],
    styles: []
})
export class ReservasComponent implements OnInit {

    reservas: Reserva[] = [];

    clientes: Cliente[] = [];

    clienteDropdownOptions: { label: string, value: any }[] = [];

    servicios: Servicio[] = [];

    loading: boolean = true;

    reserva: Reserva = {};

    cliente: Cliente = {};

    reservaDialog: boolean = false;

    deleteReservaDialog: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    repeatpass: String = "";

    isNuevoCliente: boolean = false;

    constructor(private reservasService: ReservaService, private messageService: MessageService, private clienteService: ClienteService, private servicioService: ServicioService) { }

    ngOnInit() {
        this.getAllClientes();
        this.getAllServicios();

        this.reservasService.obtenerReservas().subscribe(obj => {
            this.reservas = obj.data;
            this.loading = false;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    openNew() {
        this.reserva = {};
        this.reservaDialog = true;
    }

    hideDialog() {
        this.reserva = {};
        this.cliente = {};
        this.repeatpass = "";
        this.isNuevoCliente = false;
        this.reservaDialog = false;
    }

    saveReserva() {

        if (this.isNuevoCliente) {
            if (!this.validarCampo(this.reserva.cliente?.nombre, 'Nombre Cliente')) return;
            if (!this.validarCampo(this.reserva.cliente?.apellido, 'Apellido Cliente')) return;
            if (!this.validarCampo(this.reserva.cliente?.email, 'Email Cliente')) return;
            if (!this.validarEmail(this.reserva.cliente?.email)) return;
            if (!this.validarCampo(this.reserva.cliente?.telefono, 'Telefono Cliente')) return;
        }


    }


    validarCampo(valor: string | undefined, nombreCampo: string): boolean {
        if (!valor) {
            this.messageService.add({ severity: 'warn', summary: 'Atencion!', detail: `${nombreCampo} es requerido`, life: 3000 });
            return false;
        }
        return true;
    }




    editReserva(reservaInt: Reserva) {
        this.reserva = { ...reservaInt };
        this.reservaDialog = true;
    }

    deleteReserva(reservaInt: Reserva) {
        this.deleteReservaDialog = true;
        this.reserva = { ...reservaInt };
    }

    confirmDelete() {
        this.deleteReservaDialog = false;
        this.reservas = this.reservas.filter(val => val.id !== this.reserva.id);
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Reserva Eliminada', life: 3000 });
        this.reserva = {};
    }


    getAllClientes() {
        this.clienteService.obtenerClientes().subscribe(obj => {
            this.clientes = obj.data;
            this.clienteDropdownOptions = this.clientes.map((cliente: Cliente) => ({
                label: cliente.nombre!,
                value: cliente.id
            }));
            this.clienteDropdownOptions.push({ label: 'Nuevo cliente', value: 'nuevo' });
            this.loading = false;
        });
    }

    getAllServicios() {
        this.servicioService.obtenerServicios().subscribe(obj => {
            this.servicios = obj.data.map((servicio: Servicio) => ({
                label: servicio.nombre,
                value: servicio.id
            }));
            this.loading = false;
        });
    }

    onClienteChange(event: any) {
        this.isNuevoCliente = event.value === 'nuevo';
    }

    validarEmail(email: string | undefined): boolean {
        if (!email) {
            alert("Email es requerido");
            return false;
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            alert("Por favor, ingrese un email válido");
            return false;
        }
        return true;
    }
}
