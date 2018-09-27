import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyConsultationDetailsComponent } from './company-consultation-details.component';

describe('CompanyConsultationDetailsComponent', () => {
  let component: CompanyConsultationDetailsComponent;
  let fixture: ComponentFixture<CompanyConsultationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyConsultationDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyConsultationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
