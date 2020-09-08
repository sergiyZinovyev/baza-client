import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerFullscreenComponent} from './spinner-fullscreen/spinner-fullscreen.component';
import {ModalsService} from './modals.service';
import {MaterialModule} from '../../core/material/material.module';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';


@NgModule({
  declarations: [
    SpinnerFullscreenComponent,
    DialogInfoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [SpinnerFullscreenComponent, DialogInfoComponent],
  providers: [
    ModalsService
  ]
})
export class ModalsModule { }
