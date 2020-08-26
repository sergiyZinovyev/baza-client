import { Injectable } from '@angular/core';
import {LibService} from '../../../core/lib';

export interface IfilterData {
  filterValue: any, 
  fild: string
}

export interface IFilterControllerData {
  data: {}[], 
  filterData: IfilterData[]
}

@Injectable()
export class FiltrService {

  constructor(private libService: LibService) { }

  filterController(filterValue: string, fild: string, visitors: {}[], filterData: IfilterData[]): IFilterControllerData {
    console.log('filterController/filterValue: ',filterValue);
    let data = visitors;
    // додаємо дані для фільтрації
    filterData = this.addFiltrData(filterData, filterValue, fild);
    // проходимо по масиву фільтрації та фільтруємо всі вказані поля
    for (let i = 0; i < filterData.length; i++) {
      data = this.filter(data, filterData[i].filterValue, filterData[i].fild) 
    }
    return {'data': data, 'filterData': filterData};
  }

  // керуємо масивом даних для фільтрації (filterData - масив даних, value - нове значення, fildName - поле для фільтрації)
  // повертає новий масив даних
  private addFiltrData(filterData: {filterValue: any, fild: string}[], value: any, fildName: string):{filterValue: any, fild: string}[]{
    // перевіряємо чи існує таке поле та повертаємо його номер в масиві 
    let i = this.libService.checkArrOfObjIdVal(filterData, fildName)
    if(i >= 0){
      console.log('поле існує під номером '+i);
      filterData[i].filterValue = value
    }
    else{
      console.log('поле не існує!');
      filterData.push({
        fild: fildName,
        filterValue: value 
      })
    }

    console.log('filterData:', filterData);
    return filterData;
  }

  // фільтрує за вказаним значенням (data: масив об'єктів для фільтрації, filterValue: значення для фільтру, fild: поле фільтрації)
  // повертає новий масив
  private filter(data: {}[], filterValue: any, fild: string) {
    //let data = this.viewData
    //console.log('*f data:', data);
    if(!data || !data[0]) return
    //визначаємо тип даних в полі для пошуку
    let type = typeof(data[0][fild]);
    //console.log('*f type:', type);
    if(!filterValue){
      //якщо поле для пошуку пусте то повертаємо всі дані
      return data
    }
    if(type == 'number'){
      // якщо тип даних number тоді..
      // перевіряємо значення для фільтру

      // якщо значення для фільтру є масивом....
      if (Array.isArray(filterValue)){
        console.log('value is array: ', filterValue);
        
          data = data.filter( item => {
            let flag: boolean = true;
            for(let val of filterValue){
              // перебираємо всі елементи масива 
              // якщо елемент масива включений в item[fild] тоді відразу закінчуємо цикл з результатом true
              if(item[fild] == val){
                flag = true;
                break;
              }
              // інакше результат false та продовжуємо цикл
              else {flag = false}
            }
            return flag
          })
        
      }
      // інакше працюємо з ним як зі строкою
      else{
        data = data.filter( item => {
          return item[fild] == filterValue;
        })
      }
      
    }
    else{
      // якщо тип даних інший тоді..
      // якщо значення для фільтру є масивом....
      if (Array.isArray(filterValue)){
        console.log('value is array: ', filterValue);
        
          data = data.filter( item => {
            let flag: boolean = true;
            for(let val of filterValue){
              // перебираємо всі елементи масива 
              // якщо елемент масива включений в item[fild] тоді відразу закінчуємо цикл з результатом true
              if(String(item[fild]).toLowerCase().includes(String(val).toLowerCase())){
                flag = true;
                break;
              }
              // інакше результат false та продовжуємо цикл
              else {flag = false}
            }
            return flag
          })
        
      }
      // інакше працюємо з ним як зі строкою
      else{
        //console.log('*f data if string:', data);
        data = data.filter( item => {
          return String(item[fild]).toLowerCase().includes(String(filterValue).toLowerCase());
        })
      }
      
    }
    return data
  }
}
