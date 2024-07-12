import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Reserva } from '../../api/reserva';
import { ReservasService } from '../../service/reservas.service';


/**
 * Componente para mostrar una lista de reservas.
 * Permite listar, agregar, editar y eliminar reservas.
 */

@Component({
    templateUrl: './lista-reservas.component.html',
    providers: [MessageService, ConfirmationService],
    styles: []
})
export class ListaReservasComponent implements OnInit {

    reservas: Reserva[] = [];    

    loading: boolean = true;

    reserva: Reserva = {};

    reservaDialog: boolean = false;

    deleteReservaDialog: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private reservasService: ReservasService, private messageService: MessageService) { }

    ngOnInit() {

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
        this.reservaDialog = false;
    }

    saveReserva() {

    }


    validarCampo(valor: string | undefined, nombreCampo: string): boolean {
        if (!valor) {
            this.messageService.add({ severity: 'warn', summary: 'Atencion!', detail: `${nombreCampo} es requerido`, life: 3000 });
            return false;
        }
        return true;
    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.reservas.length; i++) {
            if (this.reservas[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
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
}
