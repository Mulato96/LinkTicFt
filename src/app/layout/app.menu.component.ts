import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Gestion',
                items: [
                    { label: 'Reservas', icon: 'pi pi-fw pi-calendar', routerLink: ['/reservas'] },
                    { label: 'Clientes', icon: 'pi pi-fw pi-user', routerLink: ['/clientes'] },
                    { label: 'Servicios', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/servicios'] },
                ]
            }
        ];
    }
}
