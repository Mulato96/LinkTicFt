import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';

import { EmpleadoService } from './demo/service/empleado.service';


//New TODO mydasboard
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        TableModule,
        CommonModule,        
        ButtonModule,        
        InputTextModule,                
        ToastModule,
        FormsModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        EmpleadoService        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
