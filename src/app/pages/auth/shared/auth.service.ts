import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/server-api';
import { StorageService } from '../../../core/storage';
import { Router } from '@angular/router';
import {IUserData, IAuthAPI} from './auth.interface'
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';

@Injectable()
export class AuthService {

  //getErrMessages: Subject<string> = new Subject();
  errMessage: string;

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.httpService.getErrMessages.subscribe(errMessage =>{
      this.errMessage = errMessage;
      //this.getErrMessages.next(this.errMessage);
    });
  }

  private getLogin(userData: IUserData): Promise<IAuthAPI>{
    this.errMessage = null;
    return new Promise((resolve, reject)=>{
      this.httpService.post(userData, 'useraccount/auth').subscribe((data: IAuthAPI) => {
        if(this.errMessage) return reject('Помилка запиту до сервера. Преревірте підключення до інтернету. Спробуйте пізніше');
        return resolve(data)
      })
    })
  }

  private catchError(loginData: IAuthAPI): Promise<IAuthAPI>{
    return new Promise((resolve, reject)=>{
      switch (loginData.msg) {
        case 'OK': 
          resolve(loginData);
          break;
        case 'NO_USER': 
          reject('Невірний логін');
          break;
        case 'PASSWORD_MISMATCH': 
          reject('Невірний пароль');
          break;  
        default:
          reject('variable or parameter is not of a valid type');
          break;
      }
    })
  }
 
  login(userData: IUserData){
    return new Promise((resolve, reject) => this.getLogin(userData)
      .then(data => this.catchError(data))
      .then(data => {
        this.storageService.setStorage(data);
        this.router.navigate(['home']);
        resolve(data)
      })
      .catch(err => reject(err))  
    )
  }

}
