import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {
 
  @Input() name: string;
  @Input() description: string;
  @Input() link: string;
  private _link: string;
  @Input() list: string;
  @Input() placeholder: string;

  @Output() navigateLink = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this._link = this.link
  }

  selected(val: number): void{
    this._link = '';
    this._link = `${this.link}/${val}`;
  }
   
  getItemMenu(): void{
    this.navigateLink.emit(this._link);
  }

}
