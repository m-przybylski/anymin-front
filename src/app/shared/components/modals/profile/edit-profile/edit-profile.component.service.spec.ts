// tslint:disable:no-empty
import { TestBed, inject } from '@angular/core/testing';
import { LoggerFactory } from '@anymind-ng/core';
import createSpyObj = jasmine.createSpyObj;
import { AccountService, ProfileService, PutExpertDetails, PutGeneralSettings } from '@anymind-ng/api';
import { UserSessionService } from '../../../../../core/services/user-session/user-session.service';
import { EditProfileModalComponentService } from './edit-profile.component.service';

describe('EditProfileModalComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditProfileModalComponentService,
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

  it('should be created', inject([EditProfileModalComponentService], (service: EditProfileModalComponentService) => {
    expect(service).toBeTruthy();
  }));

  it('should getPreviousValue$', done => {
    const service = TestBed.get(EditProfileModalComponentService);
    service.value$.next('asd');
    service.getPreviousValue$().subscribe((value: string) => {
      expect(value).toBe('asd');
      done();
    });
  });

  it('should get previous avatar src value', done => {
    const service = TestBed.get(EditProfileModalComponentService);
    service.avatarUrl$.next('/images/foto.png');
    service.getPreviousAvatarSrc().subscribe((value: string) => {
      expect(value).toBe('/images/foto.png');
      done();
    });
  });

  it('should create expert profile', () => {
    const service = TestBed.get(EditProfileModalComponentService);
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
    const service = TestBed.get(EditProfileModalComponentService);
    const accountService = TestBed.get(AccountService);
    const clientDetailsObject: PutGeneralSettings = {
      isAnonymous: false,
      nickname: 'nick',
      avatar: 'avatar',
    };

    service.createClientProfile(clientDetailsObject);
    expect(accountService.putGeneralSettingsRoute).toHaveBeenCalledWith(clientDetailsObject);
  });
});
