import { NgModule } from '@angular/core';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './job/job.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: JobsComponent },
  { path: '/:id', component: JobComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [JobsComponent, JobComponent],
  exports: [RouterModule]
})
export class JobsModule { }
