import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {LibService} from '../../../../core/lib';

@Component({
  selector: 'app-filtr',
  templateUrl: './filtr.component.html',
  styleUrls: ['./filtr.component.css']
})
export class FiltrComponent implements OnInit {
 
  @Input() tableData: {}[];
  @Input() column: string;
  @Output() dataSource = new EventEmitter<{}[]>();

  filterData: {filterValue: any, fild: string}[] = [] // дані для фільтрації viewData  
  filterDataMap = [];

  constructor(
    private libService: LibService
  ) { }

  ngOnInit(): void {
    //console.log(this.column, this.tableData)
  }

  filterController(filterValue, fild){
    console.log('filterController/filterValue: ',filterValue);
    let data = this.tableData;
    // додаємо дані для фільтрації
    let filterData = this.libService.addFiltrData(this.filterData, filterValue, fild);
    this.filterData = filterData;
    this.filterDataMap = this.filterData.map(item => item.fild);
    // проходимо по масиву фільтрації та фільтруємо всі вказані поля
    for (let i = 0; i < filterData.length; i++) {
      data = this.filter(data, filterData[i].filterValue, filterData[i].fild) 
    }
    this.dataSource.emit(data);
  }

  // фільтрує за вказаним значенням (data: масив об'єктів для фільтрації, filterValue: значення для фільтру, fild: поле фільтрації)
  // повертає новий масив
  filter(data: {}[], filterValue: any, fild: string) {
    //let data = this.viewData
    //визначаємо тип даних в полі для пошуку
    let type = typeof(data[0][fild]);
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
        data = data.filter( item => {
          return String(item[fild]).toLowerCase().includes(String(filterValue).toLowerCase());
        })
      }
      
    }
    return data
  }


}
