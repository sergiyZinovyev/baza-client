import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css']
})
export class DashboardTableComponent implements OnInit { 

  // private _dashboard: any;
  // @Input() public get dashboard(): any {
  //   return this._dashboard;
  // }
  // @Output() dashboardChange = new EventEmitter<any>(); 
  // public set dashboard(value: any) {
  //   this._dashboard = Object.assign({}, value);
  //   this.dashboardChange.emit(this._dashboard)
  // }


  @Input() name: string;
  @Input() color: string;
  @Input() additionalColumns: string[];
  @Input() displayedColumns: string[];

  @Input() buttonClearFilter: boolean = false;
  @Input() buttonColumnDirect: boolean = false;

  
  private _buttonAddVisitor: boolean = false;
  @Input() public get buttonAddVisitor(): boolean {
    return this._buttonAddVisitor;
  }
  @Output() buttonAddVisitorChange = new EventEmitter<boolean>(); 
  public set buttonAddVisitor(value: boolean) {
    this._buttonAddVisitor = value;
    this.buttonAddVisitorChange.emit(this._buttonAddVisitor)
  }

  @Output() onClearFilter = new EventEmitter<boolean>();
  @Output() onAddColumn = new EventEmitter<string>();
  @Output() onRemoveColumn = new EventEmitter<string>();
  @Output() onPassPage = new EventEmitter<string>();
 
  pages = [
    {name: 'База відвідувачів', link: ''},
    {name: 'Заявки на зміни', link: 'edited'},
    {name: 'Заявки на внесення', link: 'created'},
  ]
  
  constructor() { } 

  ngOnInit(): void {
  }

  clearFilter(): void{
    this.onClearFilter.emit(true)
  }

  addVisitor(){
    //this.onAddVisitor.emit(true)
    this.buttonAddVisitor = true
  }

  // addVisitor2(){
  //   this.dashboard.btnAddVisitor = true
  // }

  // clearFilter2(){
  //   this.dashboard.btnClearFilter = true
  // }

  addColumn(item: string): void{
    this.onAddColumn.emit(item)
  }

  removeColumn(item: string): void{
    this.onRemoveColumn.emit(item)
  }

  passPage(page: string){
    this.onPassPage.emit(page)
  }

}
