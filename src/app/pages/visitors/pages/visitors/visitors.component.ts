import { Component, OnInit, OnChanges} from '@angular/core';
import { VisitorsStorageService } from '../../shared/visitors-storage.service';
import { Visitor, model } from '../../shared/visitor-model';
import {LibService} from '../../../../core/lib';
import {ModalsService} from '../../../../ui/modals';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit, OnChanges {

  visitors: Visitor[] = [];
  name: string = 'База відвідувачів';
  color: string = '#1778b8';
  

  displayedColumns: string[];

  additionalColumns: string[];

  constructor(
    private modalsService: ModalsService,
    private visitorsStorageService: VisitorsStorageService,
    private libService: LibService
  ) { }
 
  ngOnChanges(): void {
    
  }

  ngOnInit(): void {
    this.visitorsStorageService.getVisitos.subscribe((vis: Visitor[]) => {
      this.modalsService.spinnerClose();
      this.visitors = Object.assign([], vis);
      this.displayedColumns = Object.getOwnPropertyNames(this.visitors[0]);
      this.displayedColumns.splice(this.libService.checkArrIdVal(this.displayedColumns, 'regnum'), 1);
      this.additionalColumns = this.setAdditionalColumns(this.displayedColumns)
    })
  }

  setAdditionalColumns(displayedColumns: string[]): string[]{
    let additionalColumns = [];
    const columns = model.slice();
    columns.forEach(column => {
      if(!displayedColumns.includes(column) && column !== 'regnum') {
        additionalColumns.push(column)
      }
    })
    return additionalColumns
  }

  removeColumn(item: string): void{
    this.visitorsStorageService.delField(item);
  }

  addColumn(item: string): void{
    this.visitorsStorageService.addField(item);
  }


}
