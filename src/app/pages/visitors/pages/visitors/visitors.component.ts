import { Component, OnInit, OnChanges, OnDestroy} from '@angular/core';
import { VisitorsStorageService } from '../../shared/visitors-storage.service';
import { ServerApiService } from '../../shared/server-api.service';
import { Visitor, model } from '../../shared/visitor-model';
import {ModalsService} from '../../../../ui/modals';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
}) 
export class VisitorsComponent implements OnInit, OnDestroy {

  visitors: Visitor[] = [];
  additionalColumns: string[] = model;
  name: string = 'База відвідувачів';
  color: string = '#1778b8';
  visitor: Visitor;

  isAddingItem = false;

  constructor(
    private modalsService: ModalsService,
    private visitorsStorageService: VisitorsStorageService,
    private serverApiService: ServerApiService
  ) { }

  ngOnInit(): void {
    this.visitorsStorageService.visitors.subscribe((vis: Visitor[]) => {
      this.modalsService.spinnerClose();
      this.visitors = Object.assign([], vis);
    })
  }
 
  newElement(element: string){
    console.log('element: ',element);
    this[element] = !this[element];
  }

  columnDirect(event): void{
    this.visitorsStorageService.columnDirect(event, 'visitors')
  }

  getVisitor(id: number){
    this.visitor = undefined;
    this.serverApiService.getVisitor(id).subscribe(visitor => {
      this.visitor = visitor;
    }, err => console.log('error: ', err))
  }

  submitVisitor(eventData){
    console.log('sub:',eventData)
  }

  deleteVisitor(eventData){
    console.log('del:',eventData)
  }

  ngOnDestroy() { 
    this.modalsService.spinnerClose(); 
  }

}
