import { Injectable } from '@angular/core';
import { Visitor } from './visitor-model';
import { HttpService } from '../../../core/server-api';
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {LibService} from '../../../core/lib';
import {ModalsService} from '../../../ui/modals';

@Injectable()
export class VisitorsStorageService {

  visitors: Visitor[] = [];
  getVisitos: BehaviorSubject<Visitor[]> = new BehaviorSubject(this.visitors);

  constructor(
    private modalsService: ModalsService,
    private httpService: HttpService,
    private libService: LibService
  ) { }
 
  setVisitors(visitorsData: Visitor[]): void{
    //if(this.visitors.length > 0) return;
    this.visitors = visitorsData;
    this.getVisitos.next(this.visitors)
    console.log('visitors: ', this.visitors);
  }

  delField(fieldName: string): void{
    if(fieldName === 'regnum') return
    //this.modalsService.spinnerOpen();
    console.time('big_operation_del');
    this.visitors.forEach(visitor => {
      delete visitor[fieldName]
    })
    this.getVisitos.next(this.visitors);
    console.timeEnd('big_operation_del');
    console.log('visitors: ', this.visitors);
  }
  
  addField(field: string){
    let index: number;
    let newVisitors = [];
    console.time('big_operation_0');
    console.log('field: ',field);
    let model = {
      regnum: true
    };
    model[field] = true;
    console.log('model: ',model);
    this.modalsService.spinnerOpen();
    this.httpService.post({model: model}, 'visitors/getTable/visitors').pipe( 
      map(vl => {
        return vl.map(obj => {
          return new Visitor(obj)
        })
      })
    ).subscribe((data: Visitor[]) => {
      console.timeEnd('big_operation_0');
      console.log('new data: ', data);
      console.time('big_operation');
      data.forEach(visitor => {
        //this.visitors[this.libService.checkArrOfObjIdValField(this.visitors, 'regnum', visitor['regnum'])][field] = visitor[field];
        //врахувати, якщо index не знайдено
        //можливо перевіряти перед тим довжину нового і існуючого масивів
        //якщо не співпадає то ретарн
        index = this.libService.checkArrOfObjIdValField(this.visitors, 'regnum', visitor['regnum']);
        this.visitors[index][field] = visitor[field];
        newVisitors.push(this.visitors[index]);
        this.visitors.splice(index, 1)
      });
      this.visitors = newVisitors;
      console.timeEnd('big_operation');
      this.getVisitos.next(this.visitors);
    })
  }

}


