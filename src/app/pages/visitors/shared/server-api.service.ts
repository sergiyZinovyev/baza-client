import { Injectable } from '@angular/core';
import {Observable} from'rxjs';
import { Visitor, IConfigVisitorStorage } from '../shared/visitor-model';
import { HttpService } from '../../../core/server-api';
import {map, tap} from 'rxjs/operators';
import {ModalsService} from '../../../ui/modals';

@Injectable()
export class ServerApiService {

  constructor(
    private httpService: HttpService,
    private modalsService: ModalsService,
  ) { }
 
  getVisitors(config: IConfigVisitorStorage): Observable<Visitor[]>{
    const model = config.model;
    let pass = 'visitors';
    switch (config.subject) {
      case 'visitorsEdit':
        pass = 'visitors_edit'
        break;
      case 'visitorsCreate':
        pass = 'visitors_create'
        break;
      default:
        break;
    }
    return this._getVisitors(model, pass)
  }

  private _getVisitors(model: object, pass: string): Observable<Visitor[]>{
    this.modalsService.spinnerOpen();
    return this.httpService.post({model: model}, `visitors/getTable/${pass}`).pipe( 
      tap(
        vl => {
          this.modalsService.spinnerClose();
          return console.log(`visitors from ${pass} - `, vl)}
      ),
      map(vl => {
        if(vl === "Error") throw (vl)
        else return vl.map((obj: object) => new Visitor(obj))
      })
    )
  }

  getVisitor(id: number, model?: object): Observable<Visitor>{
    return this.httpService.post({regnum: id, model: model}, `visitors/get`).pipe( 
      tap(
        vl => {
          console.log('(getVisitor) visitor - ', vl);
        }
      ),
      map(vl => {
        if(vl === "Error") throw (vl)
        else return new Visitor(vl);
      })  
    )
  }





}
