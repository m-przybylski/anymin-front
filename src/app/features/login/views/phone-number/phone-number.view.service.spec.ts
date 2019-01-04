import { TestBed } from '@angular/core/testing';
import { PhoneNumberViewService } from './phone-number.view.service';
import { GetRegistrationStatus, RegistrationService } from '@anymind-ng/api';
import { Router } from '@angular/router';
import { AlertService } from '@anymind-ng/core';
import { RegistrationInvitationService } from '../../../../shared/services/registration-invitation/registration-invitation.service';
import { of } from 'rxjs';
import { LoginHelperService } from '../../services/login-helper.service';
import { provideMockFactoryLogger } from 'testing/testing';
import { Deceiver } from 'deceiver-core';

describe('Service: PhoneNumberService', () => {
  const correctPhoneNumber = '48555555555';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhoneNumberViewService,
        LoginHelperService,
        {
          provide: RegistrationService,
          useValue: Deceiver(RegistrationService, { checkRegistrationStatusRoute: jest.fn() }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jest.fn() }),
        },
        provideMockFactoryLogger(),
        {
          provide: RegistrationInvitationService,
          useValue: Deceiver(RegistrationInvitationService, { getInvitationObject: jest.fn() }),
        },
        {
          provide: Router,
          useValue: Deceiver(Router, {
            navigate: jest.fn(() => Promise.resolve(true)),
          }),
        },
      ],
    });
  });

  it('should redirect user to blocked view after send phone number', () => {
    const phoneNumberService: PhoneNumberViewService = TestBed.get(PhoneNumberViewService);
    const router = TestBed.get(Router);
    const registrationService = TestBed.get(RegistrationService);

    registrationService.checkRegistrationStatusRoute = jest.fn(() =>
      of({ status: GetRegistrationStatus.StatusEnum.BLOCKED }),
    );

    phoneNumberService.handlePhoneNumber(correctPhoneNumber).subscribe();
    expect(router.navigate).toHaveBeenCalledWith(['/login/blocked'], undefined);
  });

  it('should redirect user to password view after send phone number', () => {
    const phoneNumberService = TestBed.get(PhoneNumberViewService);
    const router = TestBed.get(Router);
    const registrationService = TestBed.get(RegistrationService);

    registrationService.checkRegistrationStatusRoute = jest.fn(() =>
      of({ status: GetRegistrationStatus.StatusEnum.REGISTERED }),
    );

    phoneNumberService.handlePhoneNumber(correctPhoneNumber).subscribe();
    expect(router.navigate).toHaveBeenCalledWith(['/login/password', correctPhoneNumber], undefined);
  });

  it('should redirect user to pin-code view after send phone number', () => {
    const phoneNumberService = TestBed.get(PhoneNumberViewService);
    const router = TestBed.get(Router);
    const registrationService = TestBed.get(RegistrationService);

    registrationService.checkRegistrationStatusRoute = jest.fn(() =>
      of({ status: GetRegistrationStatus.StatusEnum.UNREGISTERED }),
    );

    phoneNumberService.handlePhoneNumber(correctPhoneNumber).subscribe();
    expect(router.navigate).toHaveBeenCalledWith(['/login/pin-code', correctPhoneNumber], undefined);
  });

  it('should redirect user to login/pin-code when is registered without password', () => {
    const phoneNumberService = TestBed.get(PhoneNumberViewService);
    const router = TestBed.get(Router);
    const registrationService = TestBed.get(RegistrationService);

    registrationService.checkRegistrationStatusRoute = jest.fn(() =>
      of({ status: GetRegistrationStatus.StatusEnum.NOPASSWORD }),
    );

    phoneNumberService.handlePhoneNumber(correctPhoneNumber).subscribe();
    expect(router.navigate).toHaveBeenCalledWith(['/login/pin-code', correctPhoneNumber], {
      queryParams: { noPasswordRegistrationStatus: true },
    });
  });

  it('should display alert after user try to send phone number too many times', () => {
    const phoneNumberService = TestBed.get(PhoneNumberViewService);
    const alerService = TestBed.get(AlertService);
    const registrationService = TestBed.get(RegistrationService);

    registrationService.checkRegistrationStatusRoute = jest.fn(() =>
      of({ status: GetRegistrationStatus.StatusEnum.VERIFICATIONATTEMPTSEXCEEDED }),
    );

    phoneNumberService.handlePhoneNumber(correctPhoneNumber).subscribe();
    expect(alerService.pushDangerAlert).toHaveBeenCalledWith('ALERT.MSISDN_VERIFICATION_ATTEMPTS_EXCEEDED', {
      msisdn: correctPhoneNumber,
    });
  });

  it('should display alert after user try to send phone number and something goes wrong', () => {
    const phoneNumberService = TestBed.get(PhoneNumberViewService);
    const alerService = TestBed.get(AlertService);
    const registrationService = TestBed.get(RegistrationService);

    registrationService.checkRegistrationStatusRoute = jest.fn(() => of({ status: undefined }));

    phoneNumberService.handlePhoneNumber(correctPhoneNumber).subscribe();
    expect(alerService.pushDangerAlert).toHaveBeenCalledWith('ALERT.SOMETHING_WENT_WRONG');
  });
});
