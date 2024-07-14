import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Servicio } from '../../api/servicio';
import { ServicioService } from '../../service/servicio.service';
import { FormatCurrencyPipe } from '../../pipes/format-currency.pipe';


/**
 * Componente para gestionar servicios.
 * Permite listar, agregar, editar y eliminar servicios.
 */

@Component({
    templateUrl: './servicios.component.html',
    providers: [MessageService, ConfirmationService],
    styles: []
})
export class ServiciosComponent implements OnInit {

    servicios: Servicio[] = [];

    loading: boolean = true;

    servicio: Servicio = {};

    servicioDialog: boolean = false;

    deleteServicioDialog: boolean = false;

    @ViewChild('filter') filter!: ElementRef;



    constructor(private messageService: MessageService, private servicioService: ServicioService, private formatCurrencyPipe: FormatCurrencyPipe) { }

    ngOnInit() {
        this.getAllServicios();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    openNew() {
        this.servicio = {};
        this.servicioDialog = true;
    }

    hideDialog() {
        this.servicio = {};
        this.servicioDialog = false;
    }

    createOrUpdateServicio() {
        if (!this.validarCampo(this.servicio.nombre, 'Nombre')) return;
        if (!this.validarCampo(this.servicio.descripcion, 'Descripcion')) return;
        if (!this.validarCampo(this.servicio.precio, 'Precio')) return;

        if (this.servicio.id) {
            this.updateServicio();
        } else {
            this.createServicio();
        }
    }


    updateServicio() {
        this.servicioService.actualizarServicio(this.servicio.id, this.servicio)
            .subscribe(
                response => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Servicio Actualizado exitosamente' });
                    this.getAllServicios();
                },
                error => {
                    console.error('Error al guardar el servicio:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el servicio' });
                }
            );

        this.servicioDialog = false;
        this.servicio = {};
    }


    createServicio() {
        debugger
        this.servicioService.crearServicio(this.servicio)
            .subscribe(
                response => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Servicio guardado exitosamente' });
                    this.getAllServicios();
                },
                error => {
                    console.error('Error al guardar el servicio:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el servicio' });
                }
            );

        this.servicioDialog = false;
        this.servicio = {};
    }


    validarCampo(valor: string | undefined | number, nombreCampo: string): boolean {
        if (!valor) {
            this.messageService.add({ severity: 'warn', summary: 'Atencion!', detail: `${nombreCampo} es requerido`, life: 3000 });
            return false;
        }
        return true;
    }




    editServicio(servicioInt: Servicio) {
        this.servicio = { ...servicioInt };
        this.servicioDialog = true;
    }

    deleteServicio(servicioInt: Servicio) {
        this.deleteServicioDialog = true;
        this.servicio = { ...servicioInt };
    }

    confirmDelete() {
        this.deleteServicioDialog = false;
        this.servicioService.eliminarServicio(this.servicio.id)
            .subscribe(
                response => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Servicio eliminado exitosamente' });
                    this.getAllServicios();
                },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el servicio ' + error });
                }
            );
        this.servicio = {};
    }



    getAllServicios() {
        this.servicioService.obtenerServicios().subscribe(obj => {
            this.servicios = obj.data;
            this.loading = false;
        });
    }

    // Método para formatear el valor a moneda
    formatCurrency(value: number): string {
        return this.formatCurrencyPipe.transform(value);
    }

}
