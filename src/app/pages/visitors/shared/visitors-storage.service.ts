import { Injectable } from '@angular/core';
import { Visitor } from './visitor';
import { HttpService } from '../../../core/server-api';
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {LibService} from '../../../core/lib';

@Injectable()
export class VisitorsStorageService {

  visitors: Visitor[] = [];
  getVisitos: BehaviorSubject<Visitor[]> = new BehaviorSubject(this.visitors);

  constructor(
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
    this.visitors.forEach(visitor => {
      delete visitor[fieldName]
    })
    this.getVisitos.next(this.visitors);
    console.log('visitors: ', this.visitors);
  }
  
  addField(field: string){
    let model = {
      regnum: true
    };
    model[field] = true;

    this.httpService.post({model: model}, 'visitors/getTable/visitors_create').pipe( 
      map(vl => {
        return vl.map(obj => {
          return new Visitor(obj)
        })
      })
    ).subscribe((data: Visitor[]) => {
      console.log('new data: ', data);
      data.forEach(visitor => {
        this.visitors[this.libService.checkArrOfObjIdValField(this.visitors, 'regnum', visitor['regnum'])][field] = visitor[field]
      });
      this.getVisitos.next(this.visitors);
    })
  }

}


