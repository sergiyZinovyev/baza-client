import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import {Observable} from'rxjs';
import {CardService} from '../shared/card.service';
import { IList } from '../shared/home.interface';
import { HttpService } from '../../../core/server-api';
import {map} from 'rxjs/operators';

@Injectable()
export class HomeExhibResolverService implements Resolve<any> {

  constructor(
    private cardService: CardService,
    private httpService: HttpService
  ) { }
 
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return new Promise((resolve, reject) => {
      const list = this.cardService.visexhib['list'];
      if(list && list.length > 0) return resolve('OK');
      this.httpService.get('exhibitions').pipe( 
        map(vl => {
          if(vl === "Error") return reject({ngNavigationCancelingError: true})
          else return vl.map(obj => {
            return {id: obj.numexhib, name: obj.nameexhibkor}
          })
        })
      ).subscribe((data: IList[]) => {
        if(data) this.cardService.getListExhib(data);
        resolve('OK')
      })
    }).catch(err => {throw(err)});

  }

}
