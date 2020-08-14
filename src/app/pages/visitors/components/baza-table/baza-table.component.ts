import { Component, OnInit, OnChanges, ViewChild, Input, SimpleChanges} from '@angular/core';
//import { VisitorsStorageService } from '../../shared/visitors-storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
//import { Visitor } from '../../shared/visitor';
import {LibService} from '../../../../core/lib';

@Component({
  selector: 'app-baza-table',
  templateUrl: './baza-table.component.html',
  styleUrls: ['./baza-table.component.css']
})
export class BazaTableComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //@Input() visitors: {}[];
  @Input() name: string;
  @Input() color: string;

  private _visitors: {}[];

  @Input() get visitors(): {}[] {
    return this._visitors;
  } 
  set visitors(value: {}[]) {
    console.log("setter", value);
    this._visitors = value;
  }

  arrOfCheckId = [];

  //viewData; //дані для таблиць отримані з БД 
  dataSource = new MatTableDataSource();

  // filterData: {filterValue: any, fild: string}[] = [] // дані для фільтрації viewData  
  // filterDataMap = [];


  selection = new SelectionModel(true, []); // данні для вибірки

  displayedColumns: string[];
  displayedColumns_f: string[];

  constructor(
    private libService: LibService
  ) { }
 
  ngOnChanges(): void {
    let prop = Object.getOwnPropertyNames(this.visitors[0]);
    prop.unshift('select');
    console.log("prop: ", prop);
    this.displayedColumns = prop;
    this.displayedColumns_f = this.displayedColumns.map(el => 'f_' + el);
    this.dataSource.data = this.visitors;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('visitors2: ', this.visitors)
  }  

  ngOnInit(): void {
    // let prop = Object.getOwnPropertyNames(this.visitors[0]);
    // prop.unshift('select');
    // console.log("prop: ", prop);
    // this.displayedColumns = prop;
    // this.displayedColumns_f = this.displayedColumns.map(el => 'f_' + el);
    // this.dataSource.data = this.visitors;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // console.log('visitors: ', this.visitors)
  }

  filterRow(tableData: {}[]){
    this.dataSource.data = tableData;
  }

  // filterController(filterValue, fild){
  //   console.log('filterController/filterValue: ',filterValue);
  //   let data = this.visitors;
  //   // додаємо дані для фільтрації
  //   let filterData = this.libService.addFiltrData(this.filterData, filterValue, fild);
  //   this.filterData = filterData;
  //   this.filterDataMap = this.filterData.map(item => item.fild);
  //   // проходимо по масиву фільтрації та фільтруємо всі вказані поля
  //   for (let i = 0; i < filterData.length; i++) {
  //     data = this.filter(data, filterData[i].filterValue, filterData[i].fild) 
  //   }
  //   this.dataSource.data = data;
  // }

  // // фільтрує за вказаним значенням (data: масив об'єктів для фільтрації, filterValue: значення для фільтру, fild: поле фільтрації)
  // // повертає новий масив
  // filter(data: {}[], filterValue: any, fild: string) {
  //   //let data = this.viewData
  //   //визначаємо тип даних в полі для пошуку
  //   let type = typeof(data[0][fild]);
  //   if(!filterValue){
  //     //якщо поле для пошуку пусте то повертаємо всі дані
  //     return data
  //   }
  //   if(type == 'number'){
  //     // якщо тип даних number тоді..
  //     // перевіряємо значення для фільтру

  //     // якщо значення для фільтру є масивом....
  //     if (Array.isArray(filterValue)){
  //       console.log('value is array: ', filterValue);
        
  //         data = data.filter( item => {
  //           let flag: boolean = true;
  //           for(let val of filterValue){
  //             // перебираємо всі елементи масива 
  //             // якщо елемент масива включений в item[fild] тоді відразу закінчуємо цикл з результатом true
  //             if(item[fild] == val){
  //               flag = true;
  //               break;
  //             }
  //             // інакше результат false та продовжуємо цикл
  //             else {flag = false}
  //           }
  //           return flag
  //         })
        
  //     }
  //     // інакше працюємо з ним як зі строкою
  //     else{
  //       data = data.filter( item => {
  //         return item[fild] == filterValue;
  //       })
  //     }
      
  //   }
  //   else{
  //     // якщо тип даних інший тоді..
  //     // якщо значення для фільтру є масивом....
  //     if (Array.isArray(filterValue)){
  //       console.log('value is array: ', filterValue);
        
  //         data = data.filter( item => {
  //           let flag: boolean = true;
  //           for(let val of filterValue){
  //             // перебираємо всі елементи масива 
  //             // якщо елемент масива включений в item[fild] тоді відразу закінчуємо цикл з результатом true
  //             if(String(item[fild]).toLowerCase().includes(String(val).toLowerCase())){
  //               flag = true;
  //               break;
  //             }
  //             // інакше результат false та продовжуємо цикл
  //             else {flag = false}
  //           }
  //           return flag
  //         })
        
  //     }
  //     // інакше працюємо з ним як зі строкою
  //     else{
  //       data = data.filter( item => {
  //         return String(item[fild]).toLowerCase().includes(String(filterValue).toLowerCase());
  //       })
  //     }
      
  //   }
  //   return data
  // }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle($event) {
    if ($event.checked) {
      this.onCompleteRow(this.dataSource);
    }
    if(this.isAllSelected()){
      this.selection.clear();
      this.arrOfCheckId = [];
      console.log(this.arrOfCheckId);
    } else  this.dataSource.data.forEach(row => this.selection.select(row));  
  }

  /** The label for the checkbox on the passed row */  
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  selectRow($event, dataSource) {
    if ($event.checked) {
      if(!this.arrOfCheckId.includes(dataSource.regnum)){
        this.arrOfCheckId.push(dataSource.regnum);
      }
    }
    else {
      this.arrOfCheckId.splice(this.libService.checkArrIdVal(this.arrOfCheckId, dataSource.regnum), 1);
    }
    console.log(this.arrOfCheckId);
   }

  onCompleteRow(dataSource) {
    dataSource.data.forEach(element => {
      if(!this.arrOfCheckId.includes(element.regnum)){
        this.arrOfCheckId.push(element.regnum);
      }
    });
    console.log(this.arrOfCheckId);
  } 

}
