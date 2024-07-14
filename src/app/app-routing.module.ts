import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './demo/guards/auth.guard';


@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
            {
                path: '', component: AppLayoutComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: 'reservas', loadChildren: () => import('./demo/components/reservas/reservas.module').then(m => m.ReservasModule) }  ,                                  
                    { path: 'clientes', loadChildren: () => import('./demo/components/clientes/clientes.module').then(m => m.ClientesModule) }                                    ,
                    { path: 'servicios', loadChildren: () => import('./demo/components/servicios/servicios.module').then(m => m.ServiciosModule) }                                    
                ],
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },                                    
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
