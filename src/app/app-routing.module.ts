import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
      path: '',
      canLoad: [ AuthGuard ],
      loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then(e => e.IngresoEgresoModule)
    },
    { path: '**', redirectTo: '' }
];


@NgModule({

    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule {}
