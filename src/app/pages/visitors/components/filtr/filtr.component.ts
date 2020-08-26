import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtr',
  templateUrl: './filtr.component.html',
  styleUrls: ['./filtr.component.css']
})
export class FiltrComponent implements OnInit, OnChanges {
 
  @Input() filterDataMap: [];
  @Input() column: string;
  @Input() clearFilterData: boolean;
  @Output() data = new EventEmitter<string>();

  filterValue: string;

  constructor() { }

  ngOnChanges(): void {
    // console.log('clearFilterData2: ', this.clearFilterData);
    // console.log('filterValue: ', this.filterValue);
    if(this.clearFilterData) this.filterValue = undefined;
  }

  ngOnInit(): void {}

  filterController(filterValue: string){
    console.log('filterValue: ', filterValue);
    this.data.emit(filterValue);
  }

  
}
