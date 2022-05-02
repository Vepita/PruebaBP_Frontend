import { ReportesComponent } from './components/reportes/reportes.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';

const router: Routes = [

  {

    path: 'home',
    component: AppComponent,
    data: {
      title: 'Home'
    }
  },
  {

    path: 'clientes',
    component: ClientesComponent,
    data: {
      title: 'Clientes'
    }
  },

  {

    path: 'cuentas',
    component: CuentasComponent,
    data: {
      title: 'Cuentas'
    }
  },
  {

    path: 'movimientos',
    component: MovimientosComponent,
    data: {
      title: 'Movimientos'
    }
  },
  {

    path: 'reportes',
    component: ReportesComponent,
    data: {
      title: 'Reportes'
    }
  }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router, {
  // enableTracing: true, // <-- debugging purposes only

});
