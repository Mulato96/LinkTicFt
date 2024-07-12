import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaReservasComponent } from './lista-reservas.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListaReservasComponent}
    ])],
    exports: [RouterModule]
})
export class ListaReservasRoutingModule { }
