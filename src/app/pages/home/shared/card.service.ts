import { Injectable } from '@angular/core';
import { Card } from './card';
import { IList } from './home.interface';
import { Router } from '@angular/router';

const listVisitorsTable: IList[] = [
  {id: '', name: 'База відвідувачів'},
  {id: 'edited', name: 'Заявки на зміну'},
  {id: 'created', name: 'Заявки на створення'},
]
 
@Injectable()
export class CardService {
 
  visitors = new Card("База відвідувачаів", "Тут можна перегляну дані всіх потенційних відвідувачів, внести нових та відредагувати існуючих", "visitors", listVisitorsTable, "Оберіть потрібну таблицю");
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
    data.unshift({id: '', name: 'Всі виставки'});
    this.visexhib['list'] = data;
  }

  routing(item: string): void{
    console.log(item);
    this.router.navigate([item]);
  }
  

}
