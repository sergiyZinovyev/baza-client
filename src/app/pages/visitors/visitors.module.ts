import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule} from '../../core/material/material.module';
import {LibModule} from '../../core/lib';

import { VisitorsRoutingModule } from './routing/visitors-routing.module';
import { VisitorsComponent } from './pages/visitors/visitors.component';
import { VisitorsStorageService } from './shared/visitors-storage.service';
import { BazaTableComponent } from './components/baza-table/baza-table.component';
import { FiltrComponent } from './components/filtr/filtr.component';


   
@NgModule({
  declarations: [VisitorsComponent, BazaTableComponent, FiltrComponent],
  imports: [
    CommonModule,
    VisitorsRoutingModule,
    MaterialModule,
    LibModule
  ],
  providers: [
    VisitorsStorageService
  ]
})
export class VisitorsModule { }
