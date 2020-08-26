import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsEditComponent } from './visitors-edit.component';

describe('VisitorsEditComponent', () => {
  let component: VisitorsEditComponent;
  let fixture: ComponentFixture<VisitorsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
