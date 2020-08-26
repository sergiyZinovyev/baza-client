import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import {Observable} from'rxjs';
import {VisitorsStorageService} from '../shared/visitors-storage.service';
import { Visitor } from '../shared/visitor-model'
import { HttpService } from '../../../core/server-api';
import {map} from 'rxjs/operators';
import {ModalsService} from '../../../ui/modals';

@Injectable()
export class VisitorsResolverService implements Resolve<any> {

  constructor(
    private visitorsStorageService: VisitorsStorageService,
    private httpService: HttpService,
    private modalsService: ModalsService,
  ) { }
 
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    const config = this.getResolvConfig(route.routeConfig.path);
    return new Promise((resolve, reject) => {
      const visitors = this.visitorsStorageService[config.data];
      if(visitors && visitors.length > 0) return resolve('OK');
      this.modalsService.spinnerOpen();
      this.httpService.post({model: config.model}, `visitors/getTable/${config.pass}`).pipe( 
        map(vl => {
          if(vl === "Error") return reject({ngNavigationCancelingError: true})
          else return vl.map(obj => {
            return new Visitor(obj)
          })
        })
      ).subscribe((data: Visitor[]) => {
        if(data) this.visitorsStorageService[config.func](data);
        this.modalsService.spinnerClose();
        resolve('OK')
      })
    }).catch(err => {
      this.modalsService.spinnerClose();
      throw(err)
    });

  }

  private getResolvConfig(path: string){
    let resolveConfig = {
      func: 'setVisitors',
      pass: 'visitors',
      data: 'visitors',
      model: {
        regnum: true,
        name: true,
        prizv: true,
        namepovne: true,
        email: true,
        cellphone: true,
        password: true,
        sending: true
      }
    }
    switch (path) {
      case 'edited':
        resolveConfig.data = 'visitorsEdit';
        resolveConfig.func = 'setVisitorsEdit';
        resolveConfig.pass = 'visitors_edit'
        break;
      case 'created':
        resolveConfig.data = 'visitorsCreate';
        resolveConfig.func = 'setVisitorsCreate';
        resolveConfig.pass = 'visitors_create'
        break;
      default:
        break;
    }
    return resolveConfig
  }

}
