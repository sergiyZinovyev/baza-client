import { Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { VisitorsStorageService } from '../../shared/visitors-storage.service';
import { Visitor, model } from '../../shared/visitor-model';
import {LibService} from '../../../../core/lib';
import {ModalsService} from '../../../../ui/modals';
import {FiltrService, IfilterData, IFilterControllerData} from '../../shared/filtr.service';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-page-table',
  templateUrl: './page-table.component.html',
  styleUrls: ['./page-table.component.css']
})
export class PageTableComponent implements OnInit {

  @Input() visitors: Visitor[] = [];
  @Input() visitor: Visitor;

  //@Input() countries: {}[];

  dataSource: Visitor[] = [];

  @Input() name: string;
  @Input() color: string;

  @Input() model: string[];

  @Input() buttonClearFilter: boolean = false;
  @Input() buttonColumnDirect: boolean = false;
  

  private _buttonAddVisitor: boolean = false;
  @Input() public get buttonAddVisitor(): boolean {
    return this._buttonAddVisitor;
  }
  public set buttonAddVisitor(value: boolean) {
    this._buttonAddVisitor = value;
    this.onAddVisitor.emit(true)
  }

  @Output() onAddVisitor = new EventEmitter<boolean>();


  @Output() onColumnDirect = new EventEmitter<object>();
  

  @Output() getVisitor = new EventEmitter<number>();

  @Output() delVisitor = new EventEmitter<number>();
  @Output() subVisitor = new EventEmitter<any>();
  
  // private _dashboard: Object = { btnAddVisitor: true, btnClearFilter: true };
  // public get dashboard(): Object {
  //   return this._dashboard;
  // }
  // public set dashboard(value: Object) {
  //   this._dashboard = value;
  //   console.log('dashboard: ', JSON.stringify(this._dashboard))
  // }


  displayedColumns: string[];

  additionalColumns: string[];

  filterData: IfilterData[] = []; // масив для фільтрації
  clearFilterData: boolean = false; //очистити фільтр

  constructor(
    private modalsService: ModalsService,
    private visitorsStorageService: VisitorsStorageService,
    private libService: LibService,
    private filtrService: FiltrService,
    private router: Router,
  ) { }
 
  ngOnChanges(): void {
    //this.modalsService.spinnerClose();
    this.clearFilter();
    this.visitors = Object.assign([], this.visitors);
    this.dataSource = this.visitors;
    if(this.visitors[0]){
      this.displayedColumns = Object.getOwnPropertyNames(this.visitors[0]);
      this.displayedColumns.splice(this.libService.checkArrIdVal(this.displayedColumns, 'regnum'), 1);
      this.additionalColumns = this.setAdditionalColumns(this.displayedColumns)
    }
  }
 
  ngOnInit(): void {
  }
 
  idVisitor(id: number){
    //console.log('id visitor: ', id);
    this.getVisitor.emit(id)
  }

  setAdditionalColumns(displayedColumns: string[]): string[]{
    let additionalColumns = [];
    const columns = this.model.slice();
    columns.forEach(column => {
      if(!displayedColumns.includes(column) && column !== 'regnum') {
        additionalColumns.push(column)
      }
    })
    return additionalColumns
  }

  columnDirect(column: string, action: string){
    this.onColumnDirect.emit({column: column, action: action})
  }

  filterController(obj: IfilterData): void{
    this.clearFilterData = false;
    let data: IFilterControllerData = this.filtrService.filterController(obj.filterValue, obj.fild, this.visitors, this.filterData);
    this.dataSource = data.data;
    this.filterData = data.filterData;
  }

  clearFilter(){
    this.clearFilterData = true;
    this.dataSource = this.visitors;
    this.filterData = [];
  }

  goToPage(page: string){
    console.log('page: ',page);
    this.router.navigate([`visitors/${page}`]);
  }

  submitVisitor(eventData){
    //console.log('sub:',eventData)
    this.subVisitor.emit(eventData)
  }

  deleteVisitor(eventData){
    //console.log('del:',eventData)
    this.delVisitor.emit(eventData)
  }

  addVisitor(){
    this.onAddVisitor.emit(true)
  }

}
