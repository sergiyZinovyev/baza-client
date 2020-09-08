import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

export interface IExhib{
  id: number,
  name: string,
  kod: 1|0,
  group_exhib: number
}

@Injectable()
export class PotvisitedService {

  //getExhibitions: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private serverApiService: ServerApiService
  ) {
    // this.serverApiService.getExhibitions().subscribe(data => {
    //   this.getExhibitions.next(data)
    // })
  }

  getExhibitions(): Observable<any> {
    return this.serverApiService.getExhibitions()
  }

  initForm(exhibitions:IExhib[]):FormGroup{
    let exhibitionForm = new FormGroup({});
    exhibitions.forEach(vl =>{
      exhibitionForm.addControl(vl.name, new FormControl(false))
    })
    return exhibitionForm
  }

  stringToArr(value: string):string[]{
    if (!value) return; 
    return value.split(', ').filter(value=> {
      if(value != '') return value
    });
  }
 
  objToString(obj: {}): string{
    let val ='';
    for(let key in obj){
      if(obj[key]) val+=`${key}, `;
      //else val+=`, `
    }
    if(!this.stringToArr(val) || this.stringToArr(val).length == 0) val = ''; 
    return val
  }
}
