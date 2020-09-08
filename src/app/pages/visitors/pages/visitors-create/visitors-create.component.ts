import { Component, OnInit, OnDestroy} from '@angular/core';
import { VisitorsStorageService } from '../../shared/visitors-storage.service';
import { Visitor, model } from '../../shared/visitor-model';
import {ModalsService} from '../../../../ui/modals';

@Component({
  selector: 'app-visitors-create',
  templateUrl: './visitors-create.component.html',
  styleUrls: ['./visitors-create.component.css']
})
export class VisitorsCreateComponent implements OnInit, OnDestroy {

  visitors: Visitor[] = [];
  additionalColumns: string[] = model;
  name: string = 'Заявки на внесення';
  color: string = '#007694';

  constructor(
    private modalsService: ModalsService,
    private visitorsStorageService: VisitorsStorageService,
  ) { }

  ngOnInit(): void {
    this.visitorsStorageService.visitorsCreate.subscribe((vis: Visitor[]) => {
      this.modalsService.spinnerClose();
      this.visitors = Object.assign([], vis);
    })
  }
 
  columnDirect(event): void{
    this.visitorsStorageService.columnDirect(event, 'created')
  }

  ngOnDestroy() { 
    this.modalsService.spinnerClose(); 
  }

}
