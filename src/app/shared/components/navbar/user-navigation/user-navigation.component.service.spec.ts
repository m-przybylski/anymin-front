// tslint:disable:no-empty
import { TestBed, inject } from '@angular/core/testing';
import { LoggerFactory } from '@anymind-ng/core';
import createSpyObj = jasmine.createSpyObj;
import { UserNavigationComponentService } from './user-navigation.component.service';
import { ProfileService } from '@anymind-ng/api';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';

describe('UserNavigationComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserNavigationComponentService,
        { provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService']) },
        {
          provide: ProfileService,
          useValue: createSpyObj('ProfileService', ['getProfileRoute']),
        },
        { provide: UserSessionService, useValue: createSpyObj('UserSessionService', ['getSession']) },
      ],
    });

    TestBed.get(LoggerFactory).createLoggerService.and.returnValue({
      warn: (): void => {},
      error: (): void => {},
    });
  });

  it('should be created', inject([UserNavigationComponentService], (service: UserNavigationComponentService) => {
    expect(service).toBeTruthy();
  }));

  it('should get user profile', () => {
    const service = TestBed.get(UserNavigationComponentService);
    const profileService = TestBed.get(ProfileService);

    const session: GetSessionWithAccount = {
      account: {
        id: 'id',
        msisdn: '+48555555555',
        registeredAt: new Date(),
        isBlocked: false,
        hasPassword: true,
        isClientCompany: true,
        isAnonymous: false,
        details: {
          clientId: 'sdasdasd',
        },
        currency: 'PLN',
        countryISO: 'pl',
      },
      session: {
        accountId: 'id',
        apiKey: 'apiKey',
        ipAddress: '0.0.0.0',
        isExpired: false,
        lastActivityAt: new Date(),
      },
      isCompany: true,
      isExpert: false,
    };

    service.getProfileDetails(session);
    expect(profileService.getProfileRoute).toHaveBeenCalledWith(session.account.id);
  });
});
