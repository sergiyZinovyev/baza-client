import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitorsComponent } from './pages/visitors/visitors.component';

const routes: Routes = [
  {path: '', component: VisitorsComponent},
  {path: '**', component: VisitorsComponent}
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorsRoutingModule { }
