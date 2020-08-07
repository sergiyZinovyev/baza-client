import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import {HomeExhibResolverService} from './home-exhib-resolver.service';
import { AuthGuard } from '../../../core/guards';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard], resolve:{exhibData: HomeExhibResolverService}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
     
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [HomeExhibResolverService]
})
export class HomeRoutingModule { }
