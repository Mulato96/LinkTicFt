import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignUpModule) },
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: '**', redirectTo: 'login' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
