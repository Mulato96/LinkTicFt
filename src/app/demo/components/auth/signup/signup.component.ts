import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/demo/api/cliente';
import { AuthService } from 'src/app/demo/service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-secondary) !important;
        }
    `]
})
export class SignUpComponent {
    signUpRequest: Usuario = {};
    repeatpass: String = "";
    constructor(private authService: AuthService, private router: Router) { }


    SignUp() {
        localStorage.clear();
        if (!this.validarCampo(this.signUpRequest.nombre, 'Nombre')) return;
        if (!this.validarCampo(this.signUpRequest.apellido, 'Apellido')) return;
        if (!this.validarCampo(this.signUpRequest.email, 'Email')) return;
        if (!this.validarEmail(this.signUpRequest.email)) return;
        if (!this.validarCampo(this.signUpRequest.telefono, 'Telefono')) return;
        if (!this.validarCampo(this.signUpRequest.password, 'Contraseña')) return;

        if (this.signUpRequest.password != this.repeatpass) {
            alert("Las contraseñas no coinciden");
            return;
        }

        this.authService.signup(this.signUpRequest)
            .subscribe(
                response => {                    
                    const token = response.data.token;
                    localStorage.setItem('authToken', token);
                    alert("Usuario creado con exito!");
                    this.router.navigate(['/reservas']);
                },
                error => {
                    console.log('Error al guardar el Usuario:', error.error.messageError);
                    if (error.error.messageError.includes("Ya existe la llave (email)")) {
                        alert("El Email ya se encuentra registrado para este Usuario.");
                    }
                }
            );
    }

    validarCampo(valor: string | undefined, nombreCampo: string): boolean {
        if (!valor) {
            alert(`${nombreCampo} es requerido`);
            return false;
        }
        return true;
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
}
