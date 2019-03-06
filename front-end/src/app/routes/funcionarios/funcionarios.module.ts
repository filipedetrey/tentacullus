import { NgModule } from '@angular/core';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';

const routes: Routes = [
  { path: '', component: FuncionariosComponent },
  { path: '/:id', component: FuncionarioComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  declarations: [FuncionariosComponent, FuncionarioComponent],
  exports: [RouterModule]
})
export class FuncionariosModule { }
