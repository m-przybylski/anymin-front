import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEmployeeRowComponent } from './company-employee-row.component';

describe('CompanyEmployeeRowComponent', () => {
  let component: CompanyEmployeeRowComponent;
  let fixture: ComponentFixture<CompanyEmployeeRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyEmployeeRowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEmployeeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
