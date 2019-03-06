import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { ProcessosComponent } from './processos/processos.component';
import { EtapasComponent } from './etapas/etapas.component';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatInputModule,
  MatTooltipModule,
  MatCheckboxModule
} from '@angular/material';
import { SortablejsModule } from 'angular-sortablejs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { EtapaComponent } from './etapa/etapa.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProcessoComponent } from './processo/processo.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'status', component: StatusComponent },
      { path: 'processos', component: ProcessosComponent },
      { path: 'processos/novo', component: ProcessoComponent },
      { path: 'processos/:id', component: ProcessoComponent },
      { path: 'etapas', component: EtapasComponent },
      { path: 'etapas/nova', component: EtapaComponent },
      { path: 'etapas/:id', component: EtapaComponent }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatCheckboxModule,
    ModalModule,
    ColorPickerModule,
    FormsModule,
    PopoverModule,
    SortablejsModule,
    NgSelectModule
  ],
  providers: [ColorPickerService],
  declarations: [StatusComponent, ProcessosComponent, EtapasComponent, EtapaComponent, ProcessoComponent],
  exports: [
    RouterModule
  ]
})
export class ConfiguracoesModule { }
