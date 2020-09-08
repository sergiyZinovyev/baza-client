import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from '../../core/material/material.module';
import {LibModule} from '../../core/lib';

import {VisitorModule} from '../../components/visitor/visitor.module';

import { VisitorsRoutingModule } from './routing/visitors-routing.module';
//import { VisitorComponent } from '../../components/visitor/visitor.component';

import { VisitorsStorageService } from './shared/visitors-storage.service';
import { FiltrService } from './shared/filtr.service';
import { ServerApiService } from './shared/server-api.service';

import { BazaTableComponent } from './components/baza-table/baza-table.component';
import { FiltrComponent } from './components/filtr/filtr.component';
import { DashboardTableComponent } from './components/dashboard-table/dashboard-table.component';
import { PageTableComponent } from './components/page-table/page-table.component';

import { VisitorsEditComponent } from './pages/visitors-edit/visitors-edit.component';
import { VisitorsCreateComponent } from './pages/visitors-create/visitors-create.component';
import { VisitorsComponent } from './pages/visitors/visitors.component';
//import { VisitorComponent } from './components/visitor/visitor.component';

    
@NgModule({
  declarations: [VisitorsComponent, BazaTableComponent, FiltrComponent, DashboardTableComponent, VisitorsEditComponent, VisitorsCreateComponent, PageTableComponent],
  imports: [
    VisitorModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VisitorsRoutingModule,
    MaterialModule,
    LibModule
  ],
  providers: [
    VisitorsStorageService,
    FiltrService,
    ServerApiService
  ]
})
export class VisitorsModule { }
