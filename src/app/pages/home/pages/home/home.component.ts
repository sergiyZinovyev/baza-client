import { Component, OnInit } from '@angular/core';
import { Card } from '../../shared/card';
import { CardService } from '../../shared/card.service';
  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards: Card[] = this.cardService.cards;

  constructor(
    private cardService: CardService,
  ) { }
  
  ngOnInit(): void {
  }
  
  getItemMenu(item: string): void{
    this.cardService.routing(item);
  } 
 
}
