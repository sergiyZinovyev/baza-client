import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from '../../core/material/material.module';
import { VisitorComponent } from './visitor/visitor.component';
import { VisitorService } from './visitor.service';
import { PotvisitedService } from './potvisited.service';
import { ServerApiService } from './server-api.service';
import { PotvisitedComponent } from './potvisited/potvisited.component';
 
@NgModule({
  declarations: [VisitorComponent, PotvisitedComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [VisitorComponent],
  providers: [
    VisitorService,
    PotvisitedService,
    ServerApiService
  ]
})
export class VisitorModule { }
