import { Component, OnInit, OnChanges} from '@angular/core';
import { VisitorsStorageService } from '../../shared/visitors-storage.service';
import { Visitor, model } from '../../shared/visitor-model';
import {ModalsService} from '../../../../ui/modals';

@Component({
  selector: 'app-visitors-create',
  templateUrl: './visitors-create.component.html',
  styleUrls: ['./visitors-create.component.css']
})
export class VisitorsCreateComponent implements OnInit {

  visitors: Visitor[] = [];
  additionalColumns = model;
  name: string = 'Заявки на внесення';
  color: string = '#007694';

  constructor(
    private modalsService: ModalsService,
    private visitorsStorageService: VisitorsStorageService,
  ) { }

  ngOnInit(): void {
    this.visitorsStorageService.getVisitorsCreate.subscribe((vis: Visitor[]) => {
      this.modalsService.spinnerClose();
      this.visitors = Object.assign([], vis);
    })
  }

  columnDirect(event){
    const data = 'visitorsCreate';
    if(event.action === 'add') this.visitorsStorageService.addField(event.column, data)
    else this.visitorsStorageService.delField(event.column, data);
  }

}
