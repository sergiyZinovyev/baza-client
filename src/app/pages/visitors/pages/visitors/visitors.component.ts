import { Component, OnInit, OnChanges} from '@angular/core';
import { VisitorsStorageService } from '../../shared/visitors-storage.service';
import { Visitor, model } from '../../shared/visitor-model';
import {ModalsService} from '../../../../ui/modals';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {

  visitors: Visitor[] = [];
  additionalColumns = model;
  name: string = 'База відвідувачів';
  color: string = '#1778b8';

  constructor(
    private modalsService: ModalsService,
    private visitorsStorageService: VisitorsStorageService,
  ) { }

  ngOnInit(): void {
    this.visitorsStorageService.getVisitors.subscribe((vis: Visitor[]) => {
      this.modalsService.spinnerClose();
      this.visitors = Object.assign([], vis);
    })
  }

  columnDirect(event){
    const data = 'visitors';
    if(event.action === 'add') this.visitorsStorageService.addField(event.column, data)
    else this.visitorsStorageService.delField(event.column, data);
  }

  // visitors: Visitor[] = [];
  // dataSource: Visitor[] = [];

  // name: string = 'База відвідувачів';
  // color: string = '#1778b8';
  

  // displayedColumns: string[];

  // additionalColumns: string[];

  // filterData: IfilterData[] = []; // масив для фільтрації
  // clearFilterData: boolean = false; //очистити фільтр

  // constructor(
  //   private modalsService: ModalsService,
  //   private visitorsStorageService: VisitorsStorageService,
  //   private libService: LibService,
  //   private filtrService: FiltrService,
  //   private router: Router,
  // ) { }
 
  // ngOnChanges(): void {
    
  // }

  // ngOnInit(): void {
  //   this.visitorsStorageService.getVisitors.subscribe((vis: Visitor[]) => {
  //     this.modalsService.spinnerClose();
  //     this.clearFilter();
  //     this.visitors = Object.assign([], vis);
  //     this.dataSource = this.visitors;
  //     this.displayedColumns = Object.getOwnPropertyNames(this.visitors[0]);
  //     this.displayedColumns.splice(this.libService.checkArrIdVal(this.displayedColumns, 'regnum'), 1);
  //     this.additionalColumns = this.setAdditionalColumns(this.displayedColumns)
  //   })
  // }

  // setAdditionalColumns(displayedColumns: string[]): string[]{
  //   let additionalColumns = [];
  //   const columns = model.slice();
  //   columns.forEach(column => {
  //     if(!displayedColumns.includes(column) && column !== 'regnum') {
  //       additionalColumns.push(column)
  //     }
  //   })
  //   return additionalColumns
  // }

  // removeColumn(item: string): void{
  //   this.visitorsStorageService.delField(item);
  // }

  // addColumn(item: string): void{
  //   this.visitorsStorageService.addField(item);
  // }

  // filterController(obj: IfilterData): void{
  //   this.clearFilterData = false;
  //   let data: IFilterControllerData = this.filtrService.filterController(obj.filterValue, obj.fild, this.visitors, this.filterData);
  //   this.dataSource = data.data;
  //   this.filterData = data.filterData;
  // }

  // clearFilter(){
  //   this.clearFilterData = true;
  //   this.dataSource = this.visitors;
  //   this.filterData = [];
  // }

  // goToPage(page: string){
  //   console.log('page: ',page);
  //   this.router.navigate([`visitors/${page}`]);
  // }
}
