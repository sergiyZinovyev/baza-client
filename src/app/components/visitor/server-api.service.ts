import { Injectable } from '@angular/core';
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import { HttpService } from '../../core/server-api';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class ServerApiService {

  constructor(
    private httpService: HttpService
  ) { }

  getCountry():Observable<any>{
    return this.httpService.get(`region`).pipe( 
      tap(vl => {
          console.log('countries - ', vl);
        }
      ),
      map(vl => {
        if(vl === "Error") throw (vl);
        return vl;
      })
    )
  }

  getRegions(countryid):Observable<any>{
    return this.httpService.get(`region?countryid=${countryid}`).pipe( 
      tap(vl => {
          console.log('regions - ', vl);
        }
      ),
      map(vl => {
        if(vl === "Error") throw (vl);
        return vl;
      })
    )
  }

  getCities(countryid, regionid):Observable<any>{
    return this.httpService.get(`region?countryid=${countryid}&regionid=${regionid}`).pipe( 
      tap(vl => {
          console.log('cities - ', vl);
        }
      ),
      map(vl => {
        if(vl === "Error") throw (vl);
        return vl;
      })
    )
  }

  getExhibitions():Observable<any>{
    return this.httpService.get('exhibdict').pipe( 
      tap(vl => {
          console.log('exhibdict - ', vl);
        }
      ),
      map(vl => {
        if(vl === "Error") throw (vl);
        return vl;
      })
    )
  }

  getBranches():Observable<[]>{
    return this.httpService.get(`branch`).pipe( 
      tap(vl => {
          console.log('branches - ', vl);
        }
      ),
      map(vl => {
        if(vl === "Error") throw (vl);
        return vl.map(obj => obj.branch);
      })
    )
  }
}
