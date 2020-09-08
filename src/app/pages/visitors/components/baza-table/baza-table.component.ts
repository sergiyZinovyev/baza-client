import { Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
//import { VisitorsStorageService } from '../../shared/visitors-storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
//import { Visitor } from '../../shared/visitor';
import {LibService} from '../../../../core/lib';
import {FiltrService, IfilterData, IFilterControllerData} from '../../shared/filtr.service';

@Component({
  selector: 'app-baza-table',
  templateUrl: './baza-table.component.html',
  styleUrls: ['./baza-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BazaTableComponent implements OnInit, OnChanges {
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() visitor;
  @Input() color: string;
  @Input() filterData: IfilterData[] = [] // масив для фільтрації
  @Input() clearFilterData: boolean;
  //@Input() countries: {}[];

  private _visitors: {}[];
  @Input() get visitors(): {}[] {
    return this._visitors;
  } 
  set visitors(value: {}[]) {
    //console.log("setter", value);
    this._visitors = value;
  }

  @Output() filter = new EventEmitter<IfilterData>();
  @Output() idVisitor = new EventEmitter<number>();
  @Output() delVisitor = new EventEmitter<number>();
  @Output() subVisitor = new EventEmitter<any>();

  expandetElementColor: string;

  arrOfCheckId = [];

  dataSource = new MatTableDataSource();

  selection = new SelectionModel(true, []); // данні для вибірки

  displayedColumns: string[];
  displayedColumns_f: string[];

  expandedElement;

  constructor(
    private libService: LibService,
  ) { }
 
  ngOnChanges(): void {
    this.expandetElementColor = this.color + '65';
    if(this.visitors[0]){
      let prop = Object.getOwnPropertyNames(this.visitors[0]);
      prop.unshift('select');
      this.displayedColumns = prop;
      this.displayedColumns_f = this.displayedColumns.map(el => 'f_' + el);
    }
    this.dataSource.data = this.visitors;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }  

  ngOnInit(): void {
  }

  submitVisitor(eventData){
    this.subVisitor.emit(eventData)
  }

  deleteVisitor(eventData){
    this.delVisitor.emit(eventData)
  }

  filterController(filterValue: string, fild: string): void{
    this.filter.emit({'filterValue': filterValue, 'fild': fild})
  }

  filterDataMap(): string[]{
    return this.filterData.map(item => item.fild)
  }

  getId(id: number): void{
    //console.log('expandedElement: ', this.expandedElement);
    if(!this.expandedElement || this.expandedElement.regnum !== id) this.idVisitor.emit(id)
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
