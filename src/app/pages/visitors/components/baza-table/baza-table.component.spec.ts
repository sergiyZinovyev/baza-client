import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BazaTableComponent } from './baza-table.component';

describe('BazaTableComponent', () => {
  let component: BazaTableComponent;
  let fixture: ComponentFixture<BazaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BazaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BazaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
