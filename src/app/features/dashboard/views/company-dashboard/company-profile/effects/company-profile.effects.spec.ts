import { CompanyProfileEffects } from './company-profile.effects';
import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { CompanyProfileService } from '../services/company-profile.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { CompanyProfilePageActions, CompanyProfileApiActions } from '../actions';
import { hot, cold } from 'jasmine-marbles';

describe('CompanyProfileEffects', () => {
  let companyProfileEffects: CompanyProfileEffects;
  let companyProfileService: CompanyProfileService;
  let actions$: Observable<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompanyProfileEffects,
        provideMockActions(() => actions$),
        {
          provide: CompanyProfileService,
          useValue: Deceiver(CompanyProfileService),
        },
      ],
    });
  });

  beforeEach(() => {
    companyProfileEffects = TestBed.get(CompanyProfileEffects);
    companyProfileService = TestBed.get(CompanyProfileService);
  });

  it('should be created', () => {
    expect(companyProfileEffects).toBeTruthy();
  });
  describe('loadCompanyProfile$', () => {
    it('LoadProfileAction should emit success on Load and service success', () => {
      const requestPayload: any = '🏁🏁🏁';
      const inputAction = new CompanyProfilePageActions.LoadProfileAction('fake profile');
      const outputAction = new CompanyProfileApiActions.LoadProfileActionSuccess(requestPayload);
      actions$ = hot('-a--', { a: inputAction });
      companyProfileService.getOrganizationData = jest.fn(() => cold('-a|', { a: requestPayload }));
      expect(companyProfileEffects.loadCompanyProfile$).toBeObservable(cold('--a', { a: outputAction }));
    });
    it('UpdateProfileAction should emit success on Load and service success', () => {
      const requestPayload: any = '🏁🏁🏁';
      const inputAction = new CompanyProfilePageActions.UpdateProfileAction('fake profile');
      const outputAction = new CompanyProfileApiActions.LoadProfileActionSuccess(requestPayload);
      actions$ = hot('-a--', { a: inputAction });
      companyProfileService.getOrganizationData = jest.fn(() => cold('-a|', { a: requestPayload }));
      expect(companyProfileEffects.loadCompanyProfile$).toBeObservable(cold('--a', { a: outputAction }));
    });
    it('should emit error on Load and service failure', () => {
      const requestFailure: any = 'fake error';
      const inputAction = new CompanyProfilePageActions.LoadProfileAction('fake profile');
      const outputAction = new CompanyProfileApiActions.LoadProfileActionFailure(requestFailure);
      actions$ = hot('-a--', { a: inputAction });
      companyProfileService.getOrganizationData = jest.fn(() => cold('-#', {}, requestFailure));
      expect(companyProfileEffects.loadCompanyProfile$).toBeObservable(cold('--a', { a: outputAction }));
    });
  });
});
