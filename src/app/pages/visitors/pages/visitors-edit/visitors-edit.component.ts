import { Component, OnInit, OnDestroy} from '@angular/core';
import { VisitorsStorageService } from '../../shared/visitors-storage.service';
import { ServerApiService } from '../../shared/server-api.service';
import { Visitor, model } from '../../shared/visitor-model';
import {ModalsService} from '../../../../ui/modals';

@Component({
  selector: 'app-visitors-edit',
  templateUrl: './visitors-edit.component.html',
  styleUrls: ['./visitors-edit.component.css']
})
export class VisitorsEditComponent implements OnInit, OnDestroy {
  
  visitors: Visitor[] = [];
  additionalColumns: string[] = model;
  name: string = 'Заявки на зміну';
  color: string = '#027a7a';
  visitor: Visitor;

  constructor(
    private modalsService: ModalsService,
    private visitorsStorageService: VisitorsStorageService,
    private serverApiService: ServerApiService
  ) { }

  ngOnInit(): void {
    this.visitorsStorageService.visitorsEdit.subscribe((vis: Visitor[]) => {
      this.modalsService.spinnerClose();
      this.visitors = Object.assign([], vis);
    })
  }

  getVisitor(id: number){
    //console.log('id visitor: ', id);
    this.visitor = undefined;
    this.serverApiService.getVisitor(id).subscribe(visitor => {
      //console.log('visitor: ', visitor);
      this.visitor = visitor;
    }, err => console.log('error: ', err))
  }

  columnDirect(event): void{
    this.visitorsStorageService.columnDirect(event, 'edited')
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
