import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class StorageService {

  storage: Subject<Object> = new Subject();

  constructor() { }

  setStorage(loginData): void{
    localStorage.setItem('login', loginData.name);
    localStorage.setItem('user', loginData.realname);
    localStorage.setItem('password', loginData.passw);
    localStorage.setItem('id', String(loginData.id));
    localStorage.setItem('access rights', String(loginData.accessLevel));  
    localStorage.setItem('token', '');
    this.storage.next(localStorage)
  }

  getItemStorage(item: string): string{
    return localStorage.getItem(item);
  }

  clearStorage(): void{
    localStorage.clear();
    this.storage.next(localStorage)
  }

}
