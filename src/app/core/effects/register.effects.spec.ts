import { TestBed } from '@angular/core/testing';
import { RegisterEffects } from './register.effects';
import { AccountService } from '@anymind-ng/api';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { Deceiver } from 'deceiver-core';
import { Observable } from 'rxjs';
import { provideMockFactoryLogger } from 'testing/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { RegisterActions, RegisterApiActions } from '../actions';
import { Actions } from '@ngrx/effects';

describe('RegisterEffects', () => {
  let registerEffects: RegisterEffects;
  let actions$: Observable<any>;
  let accountService: AccountService;
  let registrationInvitationService: RegistrationInvitationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegisterEffects,
        {
          provide: AccountService,
          useValue: Deceiver(AccountService, {
            postEmailConfirmInvitationRoute: jest.fn(() => cold('--')),
          }),
        },
        {
          provide: RegistrationInvitationService,
          useValue: Deceiver(RegistrationInvitationService),
        },
        provideMockFactoryLogger(),
        provideMockActions(() => actions$),
      ],
    });
  });

  beforeEach(() => {
    registerEffects = TestBed.get(RegisterEffects);
    accountService = TestBed.get(AccountService);
    registrationInvitationService = TestBed.get(RegistrationInvitationService);
    actions$ = TestBed.get(Actions);
  });

  it('should be created', () => {
    expect(registerEffects).toBeTruthy();
  });

  describe('register$ effect', () => {
    describe('when received RegisterActions.RegisterActionsTypes.Register', () => {
      describe('and no pending invitation', () => {
        beforeEach(() => {
          registrationInvitationService.getInvitationObject = jest.fn(() => undefined);
        });
        it('should emit RegisterSuccess and RegisterRedirectToDashboardsActivities', () => {
          const sessionPayload: any = '🥝🥝🥝';
          const registerSuccess = new RegisterApiActions.RegisterSuccessAction(sessionPayload);
          const redirect = new RegisterActions.RegisterRedirectToDashboardsActivitiesAction();
          const expected = cold('--(ab)-', { a: registerSuccess, b: redirect });
          actions$ = hot('--a--', { a: new RegisterActions.RegisterAction(sessionPayload) });
          accountService.postAccountRoute = jest.fn(() => cold('a|', { a: sessionPayload }));
          expect(registerEffects.register$).toBeObservable(expected);
        });
      });
      describe('and pending invitation', () => {
        beforeEach(() => {
          registrationInvitationService.getInvitationObject = jest.fn(() => ({
            token: '1234',
            email: 'name@email.pl',
          }));
        });
        it('should emit RegisterSuccess and RegisterRedirectToDashboardsActivities when email match', () => {
          const sessionPayload: any = { someFiled: '🇵🇱🇵🇱', account: { unverifiedEmail: 'name@email.pl' } };
          const newAccount: any = { name: '🦍🦍🦍' };
          const newSession: any = { someFiled: '🇵🇱🇵🇱', account: { name: '🦍🦍🦍' } };
          const registerSuccess = new RegisterApiActions.RegisterSuccessAction(newSession);
          const redirect = new RegisterActions.RegisterRedirectToDashboardsInvitationsAction(newSession);
          const expected = cold('---(ab)-', { a: registerSuccess, b: redirect });
          actions$ = hot('--a--', { a: new RegisterActions.RegisterAction(sessionPayload) });
          accountService.postAccountRoute = jest.fn(() => cold('a|', { a: sessionPayload }));
          accountService.postEmailConfirmInvitationRoute = jest.fn(() => cold('-a|', { a: newAccount }));
          expect(registerEffects.register$).toBeObservable(expected);
        });
      });
    });
  });
});
