import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {MaterialModule} from '../../core/material/material.module';
import {LibModule} from '../../core/lib';

import { VisitorsRoutingModule } from './routing/visitors-routing.module';
import { VisitorsComponent } from './pages/visitors/visitors.component';
import { VisitorsStorageService } from './shared/visitors-storage.service';
import { FiltrService } from './shared/filtr.service';
import { BazaTableComponent } from './components/baza-table/baza-table.component';
import { FiltrComponent } from './components/filtr/filtr.component';
import { DashboardTableComponent } from './components/dashboard-table/dashboard-table.component';
import { VisitorsEditComponent } from './pages/visitors-edit/visitors-edit.component';
import { VisitorsCreateComponent } from './pages/visitors-create/visitors-create.component';
import { PageTableComponent } from './components/page-table/page-table.component';
    
@NgModule({
  declarations: [VisitorsComponent, BazaTableComponent, FiltrComponent, DashboardTableComponent, VisitorsEditComponent, VisitorsCreateComponent, PageTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    VisitorsRoutingModule,
    MaterialModule,
    LibModule
  ],
  providers: [
    VisitorsStorageService,
    FiltrService
  ]
})
export class VisitorsModule { }
