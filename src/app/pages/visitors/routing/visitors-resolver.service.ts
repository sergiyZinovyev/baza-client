import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import {Observable} from'rxjs';
import {take} from 'rxjs/internal/operators';
import {VisitorsStorageService} from '../shared/visitors-storage.service';
import { Visitor, model } from '../shared/visitor-model'
import {ServerApiService} from '../shared//server-api.service';

@Injectable()
export class VisitorsResolverService implements Resolve<any> {

  constructor(
    private serverApiService: ServerApiService,
    private visitorsStorageService: VisitorsStorageService,
  ) { }
 
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    const config = this.visitorsStorageService.getVisitorsStorageConfig(route.routeConfig.path);
    return new Promise((resolve, reject) => {
      this.visitorsStorageService[config.subject].pipe(take(1)).subscribe((subData: Visitor[]) => {
        if(subData && subData.length > 0) return resolve('OK');
        this.serverApiService.getVisitors(config).subscribe(
          (data: Visitor[]) => {
            this.visitorsStorageService.setVisitors(data, config.subject);
            resolve('OK')
          }, 
          err => {
            console.log('error: ', err);
            reject({ngNavigationCancelingError: true})
          }
        )
      })
    })
  }

}
