import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css']
})
export class DashboardTableComponent implements OnInit {

  @Input() name: string;
  @Input() color: string;
  @Input() additionalColumns: string[];
  @Input() displayedColumns: string[];

  @Input() buttonClearFilter: boolean = true;
  @Input() buttonColumnDirect: boolean = true;

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
