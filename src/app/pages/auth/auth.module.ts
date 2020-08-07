import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MaterialModule} from '../../core/material/material.module';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './pages/auth/auth.component';
import { AuthService } from './shared/auth.service'


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
