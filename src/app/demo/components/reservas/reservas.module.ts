import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { ReservasComponent } from './reservas.component';
import { ReservasRoutingModule } from './reservas-routing.module';
import { InputTextareaModule } from "primeng/inputtextarea";
import { AccordionModule } from 'primeng/accordion';
import { PasswordModule } from 'primeng/password';

@NgModule({
    imports: [
        CommonModule,
        ReservasRoutingModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        DialogModule,
        CalendarModule,
        PaginatorModule,
        InputTextareaModule,
        AccordionModule,
        PasswordModule
    ],
    declarations: [ReservasComponent]
})
export class ReservasModule { }
