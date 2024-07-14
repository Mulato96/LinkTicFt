import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Reserva } from '../../api/reserva';
import { ReservaService } from '../../service/reserva.service';
import { Cliente } from '../../api/cliente';
import { Servicio } from '../../api/servicio';
import { ClienteService } from '../../service/cliente.service';
import { ServicioService } from '../../service/servicio.service';
import { DatePipe } from '@angular/common';
import { FormatCurrencyPipe } from '../../pipes/format-currency.pipe';


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


    isNuevoCliente: boolean = false;

    objCliente: any = {};

    constructor(private reservasService: ReservaService, private messageService: MessageService, private clienteService: ClienteService, private servicioService: ServicioService, private datePipe: DatePipe, private formatCurrencyPipe: FormatCurrencyPipe) { }

    ngOnInit() {        
        this.getAllClientes();
        this.getAllServicios();
        this.getAllReservas();

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
        this.isNuevoCliente = false;
        this.reservaDialog = false;
    }

    createOrUpdateCliente() {
        if (this.isNuevoCliente) {
            if (!this.validarCampo(this.cliente?.nombre, 'Nombre Cliente')) return;
            if (!this.validarCampo(this.cliente.apellido, 'Apellido Cliente')) return;
            if (!this.validarCampo(this.cliente?.telefono, 'Telefono Cliente')) return;
            if (!this.validarCampo(this.cliente?.email, 'Email Cliente')) return;
            if (!this.validarEmail(this.cliente?.email)) return;

        } else {
            if (!this.validarCampo(this.reserva.cliente?.id, 'Cliente')) return;
        }


        if (!this.validarCampo(this.reserva.servicio?.id, 'Servicio')) return;
        if (!this.validarCampo(this.reserva.fecha, 'Fecha')) return;
        if (!this.validarCampo(this.reserva.detalles, 'Detalles')) return;

        if (this.reserva.id) {
            this.updateReserva();
        } else {
            this.createReserva();
        }
    }

    updateReserva() {
        debugger
        this.reservasService.actualizarReserva(this.reserva.id, this.reserva)
            .subscribe(
                response => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Reserva Actualizada exitosamente' });
                    this.getAllReservas();
                },
                error => {
                    console.error('Error al guardar la reserva:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar la reserva' });
                }
            );

        this.hideDialog();
    }


    createReserva() {
        if (this.isNuevoCliente) {
            this.reserva.cliente = this.cliente;
            this.reserva.clientnew = this.isNuevoCliente;
        }
        this.reservasService.crearReserva(this.reserva)
            .subscribe(
                response => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Reserva guardada exitosamente' });
                    this.getAllReservas();
                },
                error => {
                    console.error('Error al guardar la reserva:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar la reserva' });
                }
            );

        this.hideDialog();
    }



    validarCampo(valor: string | undefined | number, nombreCampo: string): boolean {
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



    formatearFecha(fecha: string | undefined): string {
        return this.datePipe.transform(fecha, 'dd-MM-yyyy') || '';
    }

    deleteReserva(reservaInt: Reserva) {
        this.deleteReservaDialog = true;
        this.reserva = { ...reservaInt };
    }

    confirmDelete() {
        this.deleteReservaDialog = false;
        this.reservasService.eliminarReserva(this.reserva.id)
            .subscribe(
                response => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Reserva eliminada exitosamente' });
                    this.getAllReservas();
                },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar la reserva ' + error });
                }
            );
        this.reserva = {};
    }


    getAllClientes() {
        this.clienteService.obtenerClientes().subscribe(obj => {
            this.clientes = obj.data;
            this.clienteDropdownOptions = this.clientes.map((cliente: Cliente) => ({
                label: cliente.nombre!,
                value: cliente
            }));
            this.clienteDropdownOptions.push({ label: 'Nuevo cliente', value: 'nuevo' });
            this.loading = false;
        });
    }

    getAllServicios() {
        this.servicioService.obtenerServicios().subscribe(obj => {
            this.servicios = obj.data.map((servicio: Servicio) => ({
                label: servicio.nombre,
                value: servicio
            }));
            this.loading = false;
        });
    }

    getAllReservas() {
        this.reservasService.obtenerReservas().subscribe(obj => {
            this.reservas = obj.data;
            this.loading = false;
        });
    }

    onClienteChange(event: any) {
        this.isNuevoCliente = event.value === 'nuevo';
    }

    validarEmail(email: string | undefined): boolean {
        if (!email) {
            alert("Email es requerido");
            this.messageService.add({ severity: 'warn', summary: 'Atencion!', detail: "Email es requerido", life: 3000 });
            return false;
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            this.messageService.add({ severity: 'warn', summary: 'Atencion!', detail: "Por favor, ingrese un email válido", life: 3000 });
            return false;
        }
        return true;
    }


    // Método para formatear el valor a moneda
    formatCurrency(value: number): string {
        return this.formatCurrencyPipe.transform(value);
    }
}
