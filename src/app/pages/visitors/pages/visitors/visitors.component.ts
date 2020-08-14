import { Component, OnInit} from '@angular/core';
import { VisitorsStorageService } from '../../shared/visitors-storage.service';
import { Visitor } from '../../shared/visitor';
import {LibService} from '../../../../core/lib';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {

  visitors: Visitor[] = [];
  name: string = 'База відвідувачів';
  color: string = '#1778b8';
  

  displayedColumns: string[];

  keyData = [
    //'regnum',
    // 'name',
    // 'prizv',
    //'namepovne',
    'countryid',
    'postindeks',
    'regionid',
    'city',
    'address',
    'postaddreses',
    'telephon',
    'pobatkovi',
    'gender',
    'm_robotu',
    //'sferadij',
    'posada',
    'type',
    'kompeten',
    //'potvid',
    //'email',
    'datawnesenny ',
    'datelastcor',
    'rating',
    'ins_user',
    //'cellphone',
    'userid',
    'realname',
    'reg_countryid',
    'reg_regionid',
    'country',
    //'reg2_countryid',
    //'reg2_regionid',
    //'region',
    'cityid',
    'id_visitor',
    //'visited_exhib',
    //'sending'
  ];

  constructor(
    private visitorsStorageService: VisitorsStorageService,
    private libService: LibService
  ) { }
 
  ngOnInit(): void {
    this.visitorsStorageService.getVisitos.subscribe((vis: Visitor[]) => {
      //this.visitors = vis;
      this.visitors = Object.assign([], vis);
      this.displayedColumns = Object.getOwnPropertyNames(this.visitors[0]);
    })
  }

  removeColumn(item){
    console.log(item);
    this.visitorsStorageService.delField(item);
    this.keyData.push(item);
  }

  addColumn(item){
    console.log(item);
    this.visitorsStorageService.addField(item);
    this.displayedColumns.splice(this.libService.checkArrIdVal(this.displayedColumns, item), 1);
  }


}
