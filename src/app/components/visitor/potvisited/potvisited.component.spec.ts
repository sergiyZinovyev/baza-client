import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotvisitedComponent } from './potvisited.component';

describe('PotvisitedComponent', () => {
  let component: PotvisitedComponent;
  let fixture: ComponentFixture<PotvisitedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotvisitedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotvisitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
