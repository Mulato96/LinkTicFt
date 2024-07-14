import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';


//New TODO mydasboard
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ReservaService } from './demo/service/reserva.service';
import { AuthService } from './demo/service/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './demo/interceptors/auth.interceptor';
import { ClienteService } from './demo/service/cliente.service';
import { ServicioService } from './demo/service/servicio.service';
import { FormatCurrencyPipe } from './demo/pipes/format-currency.pipe';

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
        FormsModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ReservaService, AuthService, ClienteService, ServicioService,FormatCurrencyPipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
