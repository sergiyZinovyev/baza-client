import { Component, OnInit, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {VisitorService, IRegion} from '../visitor.service';
import {Subscription, Observable, from} from'rxjs';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit, OnChanges, OnDestroy {

  @Output() delVisitor = new EventEmitter<number>();
  @Output() subVisitor = new EventEmitter<any>();

  borderColor: string;
  private _color: string;
  @Input() public get color(): string {
    return this._color;
  }
  public set color(value: string) {
    this._color = value;
    this.borderColor = value + '35';
  }

  @Input() visitor: { [key: string]: any; };

  getCountries: Subscription;
  private _countries: IRegion[];
  private _filteredCountries: IRegion[];
  public get filteredCountries(): IRegion[] {
    return this._filteredCountries;
  };
  public set filteredCountries(value: IRegion[]) {
    this._filteredCountries = value;
  }
  public get countries(): IRegion[] {
    return this._countries;
  }
  public set countries(value: IRegion[]) {
    this._countries = value;
    this._filteredCountries = value;
  }
  

  getRegions: Subscription;
  private _regions: IRegion[];
  private _filteredRegions: IRegion[];
  public get filteredRegions(): IRegion[] {
    return this._filteredRegions;
  };
  public set filteredRegions(value: IRegion[]) {
    this._filteredRegions = value;
  }
  public get regions(): IRegion[] {
    return this._regions;
  }
  public set regions(value: IRegion[]) {
    this._regions = value;
    this._filteredRegions = value;
  }


  getCities: Subscription;
  private _cities: IRegion[];
  private _filteredCities: IRegion[];
  public get filteredCities(): IRegion[] {
    return this._filteredCities;
  };
  public set filteredCities(value: IRegion[]) {
    this._filteredCities = value;
  }
  public get cities(): IRegion[] {
    return this._cities;
  }
  public set cities(value: IRegion[]) {
    this._cities = value;
    this._filteredCities = value;
  }


  getBranches: Subscription;
  private _branches: [];
  private _filteredBranches: [];
  public get filteredBranches(): [] {
    return this._filteredBranches;
  };
  public set filteredBranches(value: []) {
    this._filteredBranches = value;
  }
  public get branches(): [] {
    return this._branches;
  }
  public set branches(value: []) {
    this._branches = value;
    this._filteredBranches = value;
  }


  visitorForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    prizv: ['', [Validators.required]],
    city: ['', [Validators.required]],
    cellphone: ['', [Validators.pattern('380[0-9]{9}'), Validators.required]],
    regnum: ['', []],
    potvid: ['', []],
    name: ['', [Validators.required]],
    postaddreses: ['', []],
    pobatkovi: ['', []],
    gender: ['', []],
    m_robotu: ['', []],
    sferadij: ['', []],
    posada: ['', []],
    type: ['', []],
    kompeten: ['', []],
    datawnesenny: ['', []],
    datelastcor: ['', []],
    ins_user: ['', []],
    countryid: [String(''), [Validators.required]],
    regionid: [String(''), [Validators.required]],
    namepovne: ['', []],
    postindeks: ['', []],
    address: ['', []],
    telephon: ['', []],
    rating: ['', []],
  })

  public get potvid(): string {
    return this.visitorForm.get('potvid').value;
  }
  public set potvid(value: string) {
    this.visitorForm.patchValue({potvid: value});
  }

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService,
  ) { }

  ngOnChanges(): void {
    if(this.visitor)this.visitorForm.patchValue(this.visitor);    
  }
 
  ngOnInit(): void {
    this.setSubscribe<IRegion[]>('getCountries', 'countries');
    this.setSubscribe<IRegion[]>('getRegions', 'regions');
    this.setSubscribe<IRegion[]>('getCities', 'cities');
    this.setSubscribe<[]>('getBranches', 'branches');

    this.setSubOnCountryChange();
    this.setSubOnRegionChange();
    this.setSubOnCityChange();
  }

  private setSubOnCityChange() {
    this.visitorForm.get('city').valueChanges.subscribe(data => {
      this.filteredCities = this.cities.filter(city => city.teretory.toLowerCase().includes(data.toLowerCase()));
    });
  }

  private setSubOnRegionChange() {
    this.visitorForm.get('regionid').valueChanges.subscribe(data => {
      this.visitorForm.patchValue({ city: '' });
      this.visitorService.getCities(this.visitorForm.get('countryid').value, data);
    });
  }

  private setSubOnCountryChange() {
    this.visitorForm.get('countryid').valueChanges.subscribe(data => {
      if (data == 1)
        this.visitorForm.get('regionid').setValidators(Validators.required);
      else
        this.visitorForm.get('regionid').clearValidators();
      this.visitorForm.get('regionid').updateValueAndValidity();
      this.visitorForm.patchValue({ regionid: '', city: '' });
      this.visitorService.getRegions(data);
    });
  }

  private setSubscribe<T>(subscription: string, subject: string): void{
    this[subscription] = this.visitorService[subject].subscribe((data:T)=>{
      this[subject] = data;
    });
  }

  private console() {
    console.log('color: ', this.color);
    console.log('visitor: ', this.visitor);
  }

  submitVisitor(){
    this.subVisitor.emit(this.visitorForm.value)
  }

  deleteVisitor(){
    this.delVisitor.emit(this.visitorForm.get('regnum').value)
  }

  ngOnDestroy():void{
    //this.subCurrrentVisitor.unsubscribe();
    this.getRegions.unsubscribe();
    this.getCountries.unsubscribe();
    this.getCities.unsubscribe();
    this.getBranches.unsubscribe();
    //this.subSearchParamsExhib.unsubscribe();
    //this.subLang.unsubscribe();
    //this.subErrMessages.unsubscribe();

    //this.loading = false;
  }
}
