import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsCreateComponent } from './visitors-create.component';

describe('VisitorsCreateComponent', () => {
  let component: VisitorsCreateComponent;
  let fixture: ComponentFixture<VisitorsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
