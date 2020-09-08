import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import {PotvisitedService, IExhib} from '../potvisited.service'

class UserExhibitions {
  constructor(arrayExhib: string[]) {
    if(arrayExhib) arrayExhib.forEach(el =>{
      this[el] = true
    })
  }
}

@Component({
  selector: 'app-potvisited',
  templateUrl: './potvisited.component.html',
  styleUrls: ['./potvisited.component.css']
})
export class PotvisitedComponent implements OnInit {

  @Input() userExhibitions:string;
  @Output() changeUserExhibitions = new EventEmitter<String>();

  exhibitions = [];
  exhibitionForm:FormGroup = new FormGroup({});

  constructor(
    private potvisitedService: PotvisitedService
  ) { }
 
  ngOnInit(): void {

    this.potvisitedService.getExhibitions().subscribe((data:IExhib[])=>{
      this.exhibitions = data;
      this.exhibitionForm = this.potvisitedService.initForm(this.exhibitions);
      this.exhibitionForm.setValidators(this.exhibitionFormValidator());
        
      this.exhibitionForm.patchValue(new UserExhibitions(this.potvisitedService.stringToArr(this.userExhibitions)), {emitEvent: false}); 

      this.exhibitionForm.valueChanges.subscribe(ev => {
        this.changeUserExhibitions.emit(this.potvisitedService.objToString(ev));
      })
    })

  }

  private exhibitionFormValidator(): ValidatorFn{
    return (group: FormGroup): {[key: string]: any} =>{
      let valid:boolean = false;
      //console.log('------------------------------------------------------');
      for(let key in group.controls){
        //console.log(`${key}: ${group.controls[key].value}`);
        if(group.controls[key].value == true) {
          valid = true;
          break
        }
      } 
      if(valid) return null;
      return {
        custom: 'Потрібно обрати принаймні одну виставку'
      };
    };
  }

}
