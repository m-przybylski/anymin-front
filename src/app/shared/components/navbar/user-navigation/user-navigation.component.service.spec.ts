// tslint:disable:no-empty
import { TestBed, inject } from '@angular/core/testing';
import { LoggerFactory } from '@anymind-ng/core';
import createSpyObj = jasmine.createSpyObj;
import { UserNavigationComponentService } from './user-navigation.component.service';
import { GetSession, ProfileService } from '@anymind-ng/api';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';

describe('UserNavigationComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserNavigationComponentService,
        {provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService'])},
        {
          provide: ProfileService, useValue: createSpyObj('ProfileService', ['getProfileRoute'
            ]
          )
        },
        {provide: UserSessionService, useValue: createSpyObj('UserSessionService', ['getSession'])},
      ]
    });

    TestBed.get(LoggerFactory).createLoggerService.and.returnValue({
      warn: (): void => {
      },
      error: (): void => {
      }
    });
  });

  it('should be created', inject([UserNavigationComponentService],
    (service: UserNavigationComponentService) => {
      expect(service).toBeTruthy();
    }));

  it('should get user profile', () => {
    const service = TestBed.get(UserNavigationComponentService);
    const profileService = TestBed.get(ProfileService);
    const session: GetSession = {
      accountId: 'accountId',
      apiKey: 'apikey',
      ipAddress: 'ip',
      country: 'country',
      isExpired: false,
      lastActivityAt: new Date(),
    };

    service.getProfileDetails(session);
    expect(profileService.getProfileRoute).toHaveBeenCalledWith(session.accountId);
  });
});
