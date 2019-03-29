import { CompanyConsultationEffects } from './company-consultation.effects';
import { Observable } from 'rxjs';
import { CompanyConsultationService } from '../services/company-consultation.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { CompanyConsultationApiActions, CompanyConsultationPageActions, CompanyProfileApiActions } from '../actions';
import { hot, cold } from 'jasmine-marbles';
import { AlertService } from '@anymind-ng/core';
import { isOwnService } from '../utils/company-profile';

describe('CompanyConsultationEffects', () => {
  let companyConsultationEffects: CompanyConsultationEffects;
  let companyConsultationService: CompanyConsultationService;
  let actions$: Observable<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompanyConsultationEffects,
        provideMockActions(() => actions$),
        {
          provide: CompanyConsultationService,
          useValue: Deceiver(CompanyConsultationService),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService),
        },
      ],
    });
  });

  beforeEach(() => {
    companyConsultationEffects = TestBed.get(CompanyConsultationEffects);
    companyConsultationService = TestBed.get(CompanyConsultationService);
    (isOwnService as jest.Mock) = jest.fn();
  });

  it('should be created', () => {
    expect(companyConsultationEffects).toBeTruthy();
  });

  describe('loadCompanyConsultation$', () => {
    it('should return LoadConsultationSuccessAction on success', () => {
      actions$ = hot('--a-', {
        a: new CompanyConsultationPageActions.LoadConsultationsAction({ serviceId: 'fake service' } as any),
      });
      companyConsultationService.getConsultationDetails = jest.fn(() => cold('-a|', { a: 'fake details' }));
      const expected = new CompanyConsultationApiActions.LoadConsultationSuccessAction('fake details' as any);
      const expected2 = new CompanyConsultationApiActions.LoadInvitesSuccessAction([]);
      (isOwnService as jest.Mock) = jest.fn(() => false);
      expect(companyConsultationEffects.loadCompanyConsultation$).toBeObservable(
        cold('---(ab)', { a: expected, b: expected2 }),
      );
    });
    it('should return LoadConsultationSuccessAction on success', () => {
      actions$ = hot('--a-', {
        a: new CompanyConsultationPageActions.LoadConsultationsAction({ serviceId: 'fake service' } as any),
      });
      companyConsultationService.getConsultationDetails = jest.fn(() => cold('-a|', { a: 'fake details' }));
      companyConsultationService.getInvitations = jest.fn(() => cold('-a|', { a: 'fake list' }));
      const expected = new CompanyConsultationApiActions.LoadConsultationSuccessAction('fake details' as any);
      const expected2 = new CompanyConsultationApiActions.LoadInvitesSuccessAction('fake list' as any);
      (isOwnService as jest.Mock) = jest.fn(() => true);
      expect(companyConsultationEffects.loadCompanyConsultation$).toBeObservable(
        cold('----(ab)', { a: expected, b: expected2 }),
      );
    });
    it('should return LoadConsultationFailureAction on get consultation error', () => {
      actions$ = hot('--a-', {
        a: new CompanyConsultationPageActions.LoadConsultationsAction({ serviceId: 'fake service' } as any),
      });
      (isOwnService as jest.Mock) = jest.fn(() => true);
      companyConsultationService.getConsultationDetails = jest.fn(() => cold('-#', {}, 'anymind'));
      const expected = new CompanyConsultationApiActions.LoadConsultationFailureAction('anymind');
      const expected2 = new CompanyConsultationApiActions.LoadInvitesFailureAction('anymind');
      expect(companyConsultationEffects.loadCompanyConsultation$).toBeObservable(
        cold('---(ab)', { a: expected, b: expected2 }),
      );
    });
    it('should return LoadConsultationFailureAction on get invites error', () => {
      actions$ = hot('--a-', {
        a: new CompanyConsultationPageActions.LoadConsultationsAction({ serviceId: 'fake service' } as any),
      });
      (isOwnService as jest.Mock) = jest.fn(() => true);
      companyConsultationService.getConsultationDetails = jest.fn(() => cold('-a|', { a: 'fake details' }));
      companyConsultationService.getInvitations = jest.fn(() => cold('-#', {}, 'anymind'));
      const expected = new CompanyConsultationApiActions.LoadConsultationFailureAction('anymind');
      const expected2 = new CompanyConsultationApiActions.LoadInvitesFailureAction('anymind');
      expect(companyConsultationEffects.loadCompanyConsultation$).toBeObservable(
        cold('----(ab)', { a: expected, b: expected2 }),
      );
    });
  });

  describe('loadConsultationInvites$', () => {
    it('should return LoadInvitesSuccessAction on success', () => {
      actions$ = hot('--a-', { a: new CompanyConsultationPageActions.LoadPendingInvitesAction('fake service') });
      companyConsultationService.getInvitations = jest.fn(() => cold('-a|', { a: 'fake list' }));
      const expected = new CompanyConsultationApiActions.LoadInvitesSuccessAction('fake list' as any);
      expect(companyConsultationEffects.loadConsultationInvites$).toBeObservable(cold('---a', { a: expected }));
    });
    it('should return LoadInvitesFailureAction on error', () => {
      actions$ = hot('--a-', { a: new CompanyConsultationPageActions.LoadPendingInvitesAction('fake service') });
      companyConsultationService.getInvitations = jest.fn(() => cold('-#', {}, 'fake error'));
      const expected = new CompanyConsultationApiActions.LoadInvitesFailureAction('fake error');
      expect(companyConsultationEffects.loadConsultationInvites$).toBeObservable(cold('---a', { a: expected }));
    });
  });

  describe('deleteEmployment$', () => {
    it('should return Consultation.DeleteEmploymentSuccess and Profile.DeleteEmploymentSuccess on success', () => {
      actions$ = hot('--a-', { a: new CompanyConsultationPageActions.DeleteEmploymentAction('fake employment') });
      companyConsultationService.deleteEmployee = jest.fn(() => cold('-a|', { a: undefined }));
      const expected = new CompanyConsultationApiActions.DeleteEmploymentSuccessAction('fake employment');
      const expected2 = new CompanyProfileApiActions.DeleteEmploymentSuccessAction('fake employment');
      expect(companyConsultationEffects.deleteEmployment$).toBeObservable(
        cold('---(ab)', { a: expected, b: expected2 }),
      );
    });
    it('should return Consultation.DeleteEmploymentFailure and Profile.DeleteEmploymentFailure on failure', () => {
      actions$ = hot('--a-', { a: new CompanyConsultationPageActions.DeleteEmploymentAction('fake employment') });
      companyConsultationService.deleteEmployee = jest.fn(() => cold('-#', {}, 'fake error'));
      const expected = new CompanyConsultationApiActions.DeleteEmploymentFailureAction('fake error');
      const expected2 = new CompanyProfileApiActions.DeleteEmploymentFailureAction('fake error');
      expect(companyConsultationEffects.deleteEmployment$).toBeObservable(
        cold('---(ab)', { a: expected, b: expected2 }),
      );
    });
  });

  describe('deleteInviteEmployment$', () => {
    it('should return DeleteInviteSuccess on success', () => {
      actions$ = hot('--a-', { a: new CompanyConsultationPageActions.DeleteInviteAction('fake invite Id') });
      companyConsultationService.deletePendingInvitation = jest.fn(() => cold('-a|', {}));
      const expected = new CompanyConsultationApiActions.DeleteInviteSuccessAction('fake invite Id');
      expect(companyConsultationEffects.deleteInviteEmployment$).toBeObservable(cold('---a', { a: expected }));
    });
    it('should return DeleteInviteFailure on error', () => {
      actions$ = hot('--a-', { a: new CompanyConsultationPageActions.DeleteInviteAction('fake invite Id') });
      companyConsultationService.deletePendingInvitation = jest.fn(() => cold('-#', {}, 'fake error'));
      const expected = new CompanyConsultationApiActions.DeleteInviteFailureAction('fake error');
      expect(companyConsultationEffects.deleteInviteEmployment$).toBeObservable(cold('---a', { a: expected }));
    });
  });
});
