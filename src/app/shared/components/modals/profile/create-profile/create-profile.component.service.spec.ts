import { TestBed } from '@angular/core/testing';
import { AccountService, ProfileService, PutExpertDetails, PutGeneralSettings } from '@anymind-ng/api';
import { CreateProfileModalComponentService } from './create-profile.component.service';
import { Deceiver } from 'deceiver-core';
import { importStore, provideMockFactoryLogger } from 'testing/testing';

describe('CreateProfileModalComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        provideMockFactoryLogger(),
        CreateProfileModalComponentService,
        {
          provide: ProfileService,
          useValue: Deceiver(ProfileService, {
            putExpertProfileRoute: jasmine.createSpy('putExpertProfileRoute'),
            getProfileRoute: jasmine.createSpy('getProfileRoute'),
          }),
        },
        {
          provide: AccountService,
          useValue: Deceiver(AccountService, {
            putGeneralSettingsRoute: jasmine.createSpy('putGeneralSettingsRoute'),
          }),
        },
      ],
    });
  });

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
