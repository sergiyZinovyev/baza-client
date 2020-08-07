import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthModule } from './pages/auth/auth.module';
import { HomeModule } from './pages/home/home.module';
import { VisitorsModule } from './pages/visitors/visitors.module';

import { AppRoutingModule } from './app-routing.module';
import {MaterialModule} from './core/material/material.module';
import { ServerApiModule } from './core/server-api';
import { StorageModule } from './core/storage';
import { GuardsModule } from './core/guards';

import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
 
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    // AuthModule,
    // HomeModule,
    // VisitorsModule,
    ServerApiModule,
    StorageModule,
    GuardsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
