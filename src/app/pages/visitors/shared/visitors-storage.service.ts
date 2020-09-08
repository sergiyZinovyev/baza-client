import { Injectable } from '@angular/core';
import { Visitor, model, IConfigVisitorStorage } from './visitor-model';
import {BehaviorSubject} from 'rxjs';
import {take} from 'rxjs/internal/operators';
import {LibService} from '../../../core/lib';
import {ServerApiService} from './server-api.service';

export type IRouteConfigPath = 'visitors' | 'edited' | 'created';

@Injectable()
export class VisitorsStorageService {

  visitors: BehaviorSubject<Visitor[]> = new BehaviorSubject([]);
  visitorsEdit: BehaviorSubject<Visitor[]> = new BehaviorSubject([]);
  visitorsCreate: BehaviorSubject<Visitor[]> = new BehaviorSubject([]);
 
  constructor(
    private libService: LibService,
    private serverApiService: ServerApiService,
  ) { } 
  
  getVisitorsStorageConfig(routeConfigPath: string): IConfigVisitorStorage{
    let config: IConfigVisitorStorage = {
      subject: 'visitors',
      model: {
        regnum: true,
        name: true,
        prizv: true,
        namepovne: true,
        email: true,
        cellphone: true,
        // password: true,
        // sending: true
      }
    }
    switch (routeConfigPath) {
      case 'edited':
        config.subject = 'visitorsEdit';
        break;
      case 'created':
        config.subject = 'visitorsCreate';
        break;
      default:
        break;
    }
    return config
  }

  setVisitors(visitorsData: Visitor[], subject: IConfigVisitorStorage['subject']): void{
    this[subject].next(visitorsData);
  }

  columnDirect(event: {action: 'add' | 'remove', column: string}, routeConfigPath: IRouteConfigPath): void{
    if(event.action === 'add') this.addField(event.column, routeConfigPath)
    else this.delField(event.column, routeConfigPath);
  }

  private delField(fieldName: string, routeConfigPath: IRouteConfigPath): void{
    if(fieldName === 'regnum') return;
    const config = this.getVisitorsStorageConfig(routeConfigPath);
    this[config.subject].pipe(take(1)).subscribe((subData: Visitor[]) => {
      subData.forEach((visitor: Visitor) => {
        delete visitor[fieldName]
      });
      this.setVisitors(subData, config.subject)
    }) 
  }
 
  private addField(field: string, routeConfigPath: IRouteConfigPath): void{
    const config = this.getVisitorsStorageConfig(routeConfigPath);
    let index: number;
    let newVisitors = [];
    //console.time('big_operation_0');
    config.model = {regnum: true};
    config.model[field] = true;
    this.serverApiService.getVisitors(config).subscribe((dataGetVisitors: Visitor[]) => {
      //console.timeEnd('big_operation_0');
      this[config.subject].pipe(take(1)).subscribe((subData: Visitor[]) => {
        dataGetVisitors.forEach(visitor => {
          //врахувати, якщо index не знайдено
          //можливо перевіряти перед тим довжину нового і існуючого масивів
          //якщо не співпадає то ретарн
          index = this.libService.checkArrOfObjIdValField(subData, 'regnum', visitor['regnum']);
          subData[index][field] = visitor[field];
          newVisitors.push(subData[index]);
          subData.splice(index, 1)
        });
        this.setVisitors(newVisitors, config.subject)
      })
    }, err => console.log('error: ', err))
  }

}


