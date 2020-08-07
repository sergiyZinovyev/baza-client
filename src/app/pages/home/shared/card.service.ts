import { Injectable } from '@angular/core';
import { Card } from './card';
import { IList } from './home.interface';
import { Router } from '@angular/router';

@Injectable()
export class CardService {
 
  visitors = new Card("База відвідувачаів", "Тут можна перегляну дані всіх потенційних відвідувачів, внести нових та відредагувати існуючих", "visitors");
  companies = new Card("База фірм", "Тут колись буде база підприємств", "companies");
  visexhib = new Card("Списки відвідувачів виставок", "Таблиці реєстрації відвідувачів по виставкам", "visexhib", [], "Оберіть потрібну виставку");
  plahty = new Card("Плахти", "Тут колись будуть плахти", "plahty");
  mail = new Card("Пошта", "Тут можна створити і відправити листи та керувати розсилками", "mail");
 
  constructor(
    private router: Router,
  ) { }

  public get cards(): Card[] {
    let cardsArr: Card[] = [];
    let arr = Object.getOwnPropertyNames(this);
    arr.forEach(element => {
      if(this[element] instanceof Card) cardsArr.push(this[element])
    });
    return cardsArr
  }

  getListExhib(data: IList[]){
    console.log('list of exhibitions: ', data);
    this.visexhib['list'] = data;
  }

  routing(item: string): void{
    console.log(item);
    this.router.navigate([item]);
  }
  

}
