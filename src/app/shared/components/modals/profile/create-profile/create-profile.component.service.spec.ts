// tslint:disable:no-empty
import { TestBed, inject } from '@angular/core/testing';
import { LoggerFactory } from '@anymind-ng/core';
import createSpyObj = jasmine.createSpyObj;
import { AccountService, ProfileService, PutExpertDetails, PutGeneralSettings } from '@anymind-ng/api';
import { UserSessionService } from '../../../../../core/services/user-session/user-session.service';
import { CreateProfileModalComponentService } from './create-profile.component.service';

describe('CreateProfileModalComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateProfileModalComponentService,
        { provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService']) },
        {
          provide: ProfileService,
          useValue: createSpyObj('ProfileService', ['putExpertProfileRoute', 'getProfileRoute']),
        },
        { provide: AccountService, useValue: createSpyObj('AccountService', ['putGeneralSettingsRoute']) },
        { provide: UserSessionService, useValue: createSpyObj('UserSessionService', ['getSession']) },
      ],
    });
    TestBed.get(LoggerFactory).createLoggerService.and.returnValue({
      warn: (): void => {},
      error: (): void => {},
    });
  });

  it('should be created', inject(
    [CreateProfileModalComponentService],
    (service: CreateProfileModalComponentService) => {
      expect(service).toBeTruthy();
    },
  ));

  it('should create expert profile', () => {
    const service: CreateProfileModalComponentService = TestBed.get(CreateProfileModalComponentService);
    const profileService = TestBed.get(ProfileService);
    const expertDetailsObject: PutExpertDetails = {
      name: 'name',
      avatar: 'avaar',
      description: 'description',
      files: [],
      links: [],
    };

    service.createExpertProfile(expertDetailsObject);
    expect(profileService.putExpertProfileRoute).toHaveBeenCalledWith(expertDetailsObject);
  });

  it('should create client profile', () => {
    const service: CreateProfileModalComponentService = TestBed.get(CreateProfileModalComponentService);
    const accountService = TestBed.get(AccountService);
    const clientDetailsObject: PutGeneralSettings = {
      nickname: 'nick',
      avatar: 'avatar',
    };

    service.createClientProfile(clientDetailsObject);
    expect(accountService.putGeneralSettingsRoute).toHaveBeenCalledWith(clientDetailsObject);
  });
});
