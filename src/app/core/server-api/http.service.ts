import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import { catchError, map, retry} from 'rxjs/operators';
 
@Injectable()
export class HttpService {

  dbUrl = 'https://visitors.galexpo.com.ua:3000';

  errMessages: string[] = [];
  getErrMessages: Subject<string> = new Subject();

  constructor(private http: HttpClient) { }

  get(prop: string): Observable<any>{
    return this.http.get(`${this.dbUrl}/${prop}`)
      .pipe(
        catchError(this.handleError<any>(`get/${prop}`, 'Error'))
      );
  }
   
  post(body, prop: string): Observable<any>{
    return this.http.post(`${this.dbUrl}/${prop}`, body) 
      .pipe(
        catchError(this.handleError<any>(`post/${prop}`, 'Error')) 
      );  
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} | ${error.url} failed: ${error.error ? JSON.stringify(error.error) : error.message} | date: ${new Date().toLocaleString("en-US", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })}`, error.error ? JSON.stringify(error.error) : error.message);
      return of(result as T);
    };
  }

  private log(message: string, err) {
    this.errMessages.push(message);
    this.getErrMessages.next(err);
  }

}
