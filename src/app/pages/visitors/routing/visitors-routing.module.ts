import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitorsComponent } from '../pages/visitors/visitors.component';
import { VisitorsEditComponent } from '../pages/visitors-edit/visitors-edit.component';
import { VisitorsCreateComponent } from '../pages/visitors-create/visitors-create.component';
import { AuthGuard } from '../../../core/guards';
import {VisitorsResolverService} from './visitors-resolver.service';

const routes: Routes = [
  {path: '', component: VisitorsComponent, canActivate: [AuthGuard], resolve:{visitorsbData: VisitorsResolverService}},
  {path: 'edited', component: VisitorsEditComponent, canActivate: [AuthGuard], resolve:{visitorsbData: VisitorsResolverService}},
  {path: 'created', component: VisitorsCreateComponent, canActivate: [AuthGuard], resolve:{visitorsbData: VisitorsResolverService}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [VisitorsResolverService]
})
export class VisitorsRoutingModule { }
