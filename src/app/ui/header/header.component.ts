import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../core/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: string = this.storageService.getItemStorage('user');

  constructor(
    private router: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.storageService.storage.subscribe(data => {
      if(data['user'] !== this.user) this.user = this.storageService.getItemStorage('user')
    })
  }
  
  getItemMenu(item: string): void{
    this.router.navigate([item]);
  }

  exit(): void{
    this.storageService.clearStorage()
    this.router.navigate(['auth']);
  }

}
