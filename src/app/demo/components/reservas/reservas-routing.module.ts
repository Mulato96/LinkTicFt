import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReservasComponent } from './reservas.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReservasComponent}
    ])],
    exports: [RouterModule]
})
export class ReservasRoutingModule { }
