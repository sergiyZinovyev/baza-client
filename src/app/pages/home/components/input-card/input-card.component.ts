import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input-card',
  templateUrl: './input-card.component.html',
  styleUrls: ['./input-card.component.css']
})
export class InputCardComponent implements OnInit {

  @Input() placeholder: string;

  private _list: {}[] = [{id: -1, name: "Обрати всі"}];

  @Input() set list(addingList: {}[]){
    this._list = this._list.concat(addingList)
  };
  get list(){return this._list}
  
  @Output() selected = new EventEmitter<Number>();
  
  selectListForm = new FormGroup({
    selectList: new FormControl('-1')
  });

  constructor() {
  }

  ngOnInit(): void {
    this.selectListForm.valueChanges.subscribe(ev => {
      this.selected.emit(ev['selectList']);
    })
  }
 
}
