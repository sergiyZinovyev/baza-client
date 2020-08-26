import { Component, OnInit} from '@angular/core';
import { VisitorsStorageService } from '../../shared/visitors-storage.service';
import { Visitor, model } from '../../shared/visitor-model';
import {ModalsService} from '../../../../ui/modals';

@Component({
  selector: 'app-visitors-edit',
  templateUrl: './visitors-edit.component.html',
  styleUrls: ['./visitors-edit.component.css']
})
export class VisitorsEditComponent implements OnInit {
 
  visitors: Visitor[] = [];
  additionalColumns = model;
  name: string = 'Заявки на зміну';
  color: string = '#027a7a';

  constructor(
    private modalsService: ModalsService,
    private visitorsStorageService: VisitorsStorageService,
  ) { }

  ngOnInit(): void {
    this.visitorsStorageService.getVisitorsEdit.subscribe((vis: Visitor[]) => {
      this.modalsService.spinnerClose();
      this.visitors = Object.assign([], vis);
    })
  }

  columnDirect(event){
    const data = 'visitorsEdit';
    if(event.action === 'add') this.visitorsStorageService.addField(event.column, data)
    else this.visitorsStorageService.delField(event.column, data);
  }

}
