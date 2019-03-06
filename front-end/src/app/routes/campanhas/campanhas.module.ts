import { NgModule } from '@angular/core';
import { CampanhasComponent } from './campanhas/campanhas.component';
import { CampanhaComponent } from './campanha/campanha.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CampanhasComponent },
  { path: '/:id', component: CampanhaComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [CampanhasComponent, CampanhaComponent],
  exports: [RouterModule]
})
export class CampanhasModule { }
