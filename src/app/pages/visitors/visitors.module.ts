import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule} from '../../core/material/material.module';

import { VisitorsRoutingModule } from './visitors-routing.module';
import { VisitorsComponent } from './pages/visitors/visitors.component';

  
@NgModule({
  declarations: [VisitorsComponent],
  imports: [
    CommonModule,
    VisitorsRoutingModule,
    MaterialModule
  ]
})
export class VisitorsModule { }
