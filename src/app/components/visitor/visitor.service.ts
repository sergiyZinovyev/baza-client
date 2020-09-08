import { Injectable } from '@angular/core';
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import { ServerApiService } from './server-api.service';
import {map, tap} from 'rxjs/operators';

export interface IRegion {
  city_region: string
  cityid: number
  countryid: number
  regionid: number
  teretory: string
  teretory_eng: string
}

@Injectable()
export class VisitorService {

  countries: BehaviorSubject<IRegion[]> = new BehaviorSubject([]);
  regions: BehaviorSubject<IRegion[]> = new BehaviorSubject([]);
  cities: BehaviorSubject<IRegion[]> = new BehaviorSubject([]);

  branches: BehaviorSubject<[]> = new BehaviorSubject([]);

  constructor(
    private serverApiService: ServerApiService
  ){
    this.setBehaviorSubject<IRegion[]>('countries', 'getCountry');
    this.setBehaviorSubject<string[]>('branches', 'getBranches');
  }
 
  private setBehaviorSubject<T>(sbject: string, methodName: string, methodArument:any[] = []): void{
    this.serverApiService[methodName](...methodArument).subscribe(
      (data: T) => this[sbject].next(data),
      (err: any) => console.log(err)
    )
  }

  getRegions(countryid){
    this.setBehaviorSubject<IRegion[]>('regions', 'getRegions', [countryid])
  }

  getCities(countryid, regionid){
    if(!countryid || !regionid) return;
    if(regionid>0){
      this.setBehaviorSubject<IRegion[]>('cities', 'getCities', [countryid, regionid])
    }
  }
}
