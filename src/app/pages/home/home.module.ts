import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MaterialModule} from '../../core/material/material.module';

import { HomeRoutingModule } from './routing/home-routing.module';

import { CardService } from './shared/card.service';
import { HomeExhibResolverService } from './routing/home-exhib-resolver.service';

import { HomeComponent } from './pages/home/home.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { InputCardComponent } from './components/input-card/input-card.component'; 
    
@NgModule({
  declarations: [
    HomeComponent,
    InfoCardComponent,
    InputCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CardService,
  ],
})
export class HomeModule { }
