import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomeModule', canLoad: [AuthGuard]},
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthModule'},
  { path: 'visitors', loadChildren: './pages/visitors/visitors.module#VisitorsModule', canLoad: [AuthGuard]},
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
        
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
