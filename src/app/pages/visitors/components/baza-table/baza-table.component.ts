import { Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
//import { VisitorsStorageService } from '../../shared/visitors-storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
//import { Visitor } from '../../shared/visitor';
import {LibService} from '../../../../core/lib';
import {FiltrService, IfilterData, IFilterControllerData} from '../../shared/filtr.service';

@Component({
  selector: 'app-baza-table',
  templateUrl: './baza-table.component.html',
  styleUrls: ['./baza-table.component.css']
})
export class BazaTableComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //@Input() name: string;
  @Input() color: string;
  @Input() filterData: IfilterData[] = [] // масив для фільтрації
  @Input() clearFilterData: boolean;

  private _visitors: {}[];
  @Input() get visitors(): {}[] {
    return this._visitors;
  } 
  set visitors(value: {}[]) {
    //console.log("setter", value);
    this._visitors = value;
  }

  @Output() filter = new EventEmitter<IfilterData>();

  arrOfCheckId = [];

  dataSource = new MatTableDataSource();

  selection = new SelectionModel(true, []); // данні для вибірки

  displayedColumns: string[];
  displayedColumns_f: string[];

  constructor(
    private libService: LibService,
    //private filtrService: FiltrService,
  ) { }
 
  ngOnChanges(): void {
    //console.log('visitors2: ', this.visitors);
    if(this.visitors[0]){
      let prop = Object.getOwnPropertyNames(this.visitors[0]);
      prop.unshift('select');
      this.displayedColumns = prop;
      this.displayedColumns_f = this.displayedColumns.map(el => 'f_' + el);
    }
    this.dataSource.data = this.visitors;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //console.log('clearFilterData: ', this.clearFilterData);
  }  

  ngOnInit(): void {
  }

  filterController(filterValue: string, fild: string): void{
    this.filter.emit({'filterValue': filterValue, 'fild': fild})
  }

  filterDataMap(): string[]{
    return this.filterData.map(item => item.fild)
  }

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
