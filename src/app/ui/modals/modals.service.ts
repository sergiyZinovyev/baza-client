import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {SpinnerFullscreenComponent} from './spinner-fullscreen/spinner-fullscreen.component'
import {DialogInfoComponent} from './dialog-info/dialog-info.component'

@Injectable()
export class ModalsService {

  private spinner: MatDialogRef<SpinnerFullscreenComponent>;
  private mainPromiseSpinner: Promise<any> = Promise.resolve();
  private mainPromise: Promise<any> = Promise.resolve();

  constructor(public dialog: MatDialog) { }

  dialogInfoOpen(message: string){
    this.mainPromise = this.mainPromise.then(_=>this.dialogInfoOpenPromise(message))
  }  
  private dialogInfoOpenPromise(message: string):Promise<any>{
    return new Promise((resolve, reject)=>{
      const dialogRef = this.dialog.open(DialogInfoComponent, {data: message});
      dialogRef.afterClosed().subscribe(result => {
        resolve('DONE')
      });
    })
  }

  spinnerOpen(){
    this.mainPromiseSpinner = this.mainPromiseSpinner.then(_=>this.spinnerOpenPromise())
  }  
  private spinnerOpenPromise():Promise<any>{
    return Promise.resolve(this.spinner = this.dialog.open(SpinnerFullscreenComponent, {panelClass: 'transparent', disableClose: true}))
  }

  spinnerClose(){
    this.mainPromiseSpinner = this.mainPromiseSpinner.then(_=>this.spinnerClosePromise())
  }  
  private spinnerClosePromise():Promise<any>{
    if(this.spinner) return Promise.resolve(this.spinner.close())
    else return Promise.resolve()
  }



}
