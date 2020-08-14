import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {SpinnerFullscreenComponent} from './spinner-fullscreen/spinner-fullscreen.component'

@Injectable()
export class ModalsService {

  private spinner: MatDialogRef<SpinnerFullscreenComponent>;
  private mainPromise: Promise<any> = Promise.resolve();

  constructor(public dialog: MatDialog) { }

  spinnerOpen(){
    this.mainPromise = this.mainPromise.then(_=>this.spinnerOpenPromise())
  }  

  private spinnerOpenPromise():Promise<any>{
    return Promise.resolve(this.spinner = this.dialog.open(SpinnerFullscreenComponent, {panelClass: 'transparent', disableClose: true}))
  }

  spinnerClose(){
    this.mainPromise = this.mainPromise.then(_=>this.spinnerClosePromise())
  }  

  private spinnerClosePromise():Promise<any>{
    if(this.spinner) return Promise.resolve(this.spinner.close())
    else return Promise.resolve()
  }
}
