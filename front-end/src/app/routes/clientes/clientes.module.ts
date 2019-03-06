import { NgModule } from '@angular/core';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ClienteComponent },
  { path: '/:id', component: ClienteComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [ClientesComponent, ClienteComponent],
  exports: [RouterModule]
})
export class ClientesModule { }
