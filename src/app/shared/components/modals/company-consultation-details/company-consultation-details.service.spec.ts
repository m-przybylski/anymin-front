import { TestBed, inject } from '@angular/core/testing';

import { CompanyConsultationDetailsService } from './company-consultation-details.service';

describe('CompanyConsultationDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyConsultationDetailsService],
    });
  });

  it('should be created', inject([CompanyConsultationDetailsService], (service: CompanyConsultationDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
