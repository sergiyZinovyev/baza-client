import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerFullscreenComponent} from './spinner-fullscreen/spinner-fullscreen.component';
import {ModalsService} from './modals.service';
import {MaterialModule} from '../../core/material/material.module';


@NgModule({
  declarations: [
    SpinnerFullscreenComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [SpinnerFullscreenComponent],
  providers: [
    ModalsService
  ]
})
export class ModalsModule { }
