import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../shared/auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  errorMessage:string = '';
  getSpinner: boolean = false;

  loginForm = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.loginForm.valid){
      this.errorMessage = '';
      this.getSpinner = true;
      this.authService.login(this.loginForm.value)
        .then(data => {
          this.getSpinner = false;
        })
        .catch(err => {
          this.getSpinner = false;
          this.errorMessage = err
        })
    } 
  }

}
