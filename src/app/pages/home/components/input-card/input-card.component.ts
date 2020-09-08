import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input-card',
  templateUrl: './input-card.component.html',
  styleUrls: ['./input-card.component.css']
})
export class InputCardComponent implements OnInit {

  @Input() placeholder: string;

  private _list: {}[] = [];
  @Input() set list(addingList: {}[]){
    this._list = addingList
  };
  get list(){return this._list}
  
  @Output() selected = new EventEmitter<Number>();
   
  selectListForm = new FormGroup({
    selectList: new FormControl('')
  });

  constructor() {
  }

  ngOnInit(): void {
    this.selectListForm.valueChanges.subscribe(ev => {
      this.selected.emit(ev['selectList']);
    })
  }
 
}
