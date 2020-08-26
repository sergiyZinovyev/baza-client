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
  getVisitors: BehaviorSubject<Visitor[]> = new BehaviorSubject(this.visitors);

  visitorsEdit: Visitor[] = [];
  getVisitorsEdit: BehaviorSubject<Visitor[]> = new BehaviorSubject(this.visitorsEdit);

  visitorsCreate: Visitor[] = [];
  getVisitorsCreate: BehaviorSubject<Visitor[]> = new BehaviorSubject(this.visitorsCreate);

  constructor(
    private modalsService: ModalsService,
    private httpService: HttpService,
    private libService: LibService
  ) { }
 
  setVisitors(visitorsData: Visitor[]): void{
    this.visitors = visitorsData;
    this.getVisitors.next(this.visitors);
  }

  setVisitorsEdit(visitorsData: Visitor[]): void{
    this.visitorsEdit = visitorsData;
    this.getVisitorsEdit.next(this.visitorsEdit);
  }

  setVisitorsCreate(visitorsData: Visitor[]): void{
    this.visitorsCreate = visitorsData;
    this.getVisitorsCreate.next(this.visitorsCreate);
  }

  delField(fieldName: string, data: string = 'visitors'): void{
    if(fieldName === 'regnum') return;
    const config = this.getVisitorsStorageConfig(data);
    this[config.dataSubjectName].forEach((visitor: Visitor) => {
      delete visitor[fieldName]
    });
    this[config.subject].next(this[config.dataSubjectName]);
  }
    
  addField(field: string, data: string = 'visitors'){
    const config = this.getVisitorsStorageConfig(data);
    let index: number;
    let newVisitors = [];
    // console.time('big_operation_0');
    // console.log('field: ',field);
    let model = {
      regnum: true
    };
    model[field] = true;
    this.modalsService.spinnerOpen();
    return new Promise((resolve, reject) => {
    this.httpService.post({model: model}, `visitors/getTable/${config.pass}`).pipe( 
      map(vl => {
        if(vl === "Error") return reject(`Error in request ${config.pass}`)
        return vl.map(obj => {
          return new Visitor(obj)
        })
      })
    ).subscribe((data: Visitor[]) => {
      if(!data) return resolve()
      // console.timeEnd('big_operation_0');
      // console.log('new data: ', data);
      // console.time('big_operation');
      data.forEach(visitor => {
        //врахувати, якщо index не знайдено
        //можливо перевіряти перед тим довжину нового і існуючого масивів
        //якщо не співпадає то ретарн
        index = this.libService.checkArrOfObjIdValField(this[config.dataSubjectName], 'regnum', visitor['regnum']);
        this[config.dataSubjectName][index][field] = visitor[field];
        newVisitors.push(this[config.dataSubjectName][index]);
        this[config.dataSubjectName].splice(index, 1)
      });
      this[config.dataSubjectName] = newVisitors;
      //console.timeEnd('big_operation');
      this[config.subject].next(this[config.dataSubjectName]);
      resolve()
    })
    }).catch(err => {
      console.log('addField error: ', err)
      this.modalsService.spinnerClose();
    });
  }

  private getVisitorsStorageConfig(dataName: string){
    let config = {
      subject: 'getVisitors',
      dataSubjectName: 'visitors',
      pass: 'visitors'
    }
    switch (dataName) {
      case 'visitorsEdit':
        config.dataSubjectName = 'visitorsEdit';
        config.subject = 'getVisitorsEdit';
        config.pass = 'visitors_edit';
        break;
      case 'visitorsCreate':
        config.dataSubjectName = 'visitorsCreate';
        config.subject = 'getVisitorsCreate';
        config.pass = 'visitors_create';
        break;
      default:
        break;
    }
    return config
  }

}


