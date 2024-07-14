import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SigninRequest } from 'src/app/demo/api/cliente';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    signinRequest: SigninRequest = {};

    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router) { }


    iniciarSesion() {
        this.authService.signin(this.signinRequest)
            .subscribe(
                response => {
                    const token = response.token;
                    localStorage.setItem('authToken', token);
                    this.router.navigate(['/reservas']);
                },
                error => {
                    console.log('Error al guardar el Usuario:', error.error.messageError);
                    alert("Problemas al inciar sesion");
                }
            );
    }
}
