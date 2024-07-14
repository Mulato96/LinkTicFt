import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cliente } from '../../api/cliente';
import { ClienteService } from '../../service/cliente.service';


/**
 * Componente para gestionar clientes.
 * Permite listar, agregar, editar y eliminar clientes.
 */

@Component({
    templateUrl: './clientes.component.html',
    providers: [MessageService, ConfirmationService],
    styles: []
})
export class ClientesComponent implements OnInit {

    clientes: Cliente[] = [];

    loading: boolean = true;

    cliente: Cliente = {};

    clienteDialog: boolean = false;

    deleteClienteDialog: boolean = false;

    @ViewChild('filter') filter!: ElementRef;


    constructor(private clienteService: ClienteService, private messageService: MessageService) { }

    ngOnInit() {
        this.getAllClientes();
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    openNew() {
        this.cliente = {};
        this.clienteDialog = true;
    }

    hideDialog() {
        this.cliente = {};
        this.clienteDialog = false;
    }


    createOrUpdateCliente() {
        if (!this.validarCampo(this.cliente.nombre, 'Nombre Cliente')) return;
        if (!this.validarCampo(this.cliente.apellido, 'Apellido Cliente')) return;
        if (!this.validarCampo(this.cliente.email, 'Email Cliente')) return;
        if (!this.validarEmail(this.cliente.email)) return;
        if (!this.validarCampo(this.cliente.telefono, 'Telefono Cliente')) return;

        if (this.cliente.id) {
            this.updateCliente();
        } else {
            this.createCliente();
        }
    }

    updateCliente() {
        this.clienteService.actualizarCliente(this.cliente.id, this.cliente)
            .subscribe(
                response => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente Actualizado exitosamente' });
                    this.getAllClientes();
                },
                error => {
                    console.error('Error al guardar el cliente:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el cliente' });
                }
            );

        this.clienteDialog = false;
        this.cliente = {};
    }


    createCliente() {
        this.clienteService.crearCliente(this.cliente)
            .subscribe(
                response => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente guardado exitosamente' });
                    this.getAllClientes();
                },
                error => {
                    console.error('Error al guardar el cliente:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el cliente' });
                }
            );

        this.clienteDialog = false;
        this.cliente = {};
    }


    validarCampo(valor: string | undefined, nombreCampo: string): boolean {
        if (!valor) {
            this.messageService.add({ severity: 'warn', summary: 'Atencion!', detail: `${nombreCampo} es requerido`, life: 3000 });
            return false;
        }
        return true;
    }

    editCliente(clienteInt: Cliente) {
        this.cliente = { ...clienteInt };
        this.clienteDialog = true;
    }

    deleteCliente(clienteInt: Cliente) {
        this.deleteClienteDialog = true;
        this.cliente = { ...clienteInt };
    }

    confirmDelete() {
        this.deleteClienteDialog = false;
        this.clienteService.eliminarCliente(this.cliente.id)
            .subscribe(
                response => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente eliminado exitosamente' });
                    this.getAllClientes();
                },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el cliente ' + error });
                }
            );
        this.cliente = {};
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

    getAllClientes() {
        this.clienteService.obtenerClientes().subscribe(obj => {
            this.clientes = obj.data;
            this.loading = false;
        });
    }
}
