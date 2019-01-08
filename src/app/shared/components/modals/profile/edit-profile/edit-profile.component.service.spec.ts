import { TestBed } from '@angular/core/testing';
import { AccountService, ProfileService, PutExpertDetails, PutGeneralSettings } from '@anymind-ng/api';
import { EditProfileComponentService } from './edit-profile.component.service';
import { Deceiver } from 'deceiver-core';
import { importStore, provideMockFactoryLogger, dispatchLoggedUser } from 'testing/testing';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { AlertService } from '@anymind-ng/core';

describe('EditProfileComponentService', () => {
  let store: Store<any>;
  let service: EditProfileComponentService;
  let profileService: ProfileService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        provideMockFactoryLogger(),
        EditProfileComponentService,
        {
          provide: ProfileService,
          useValue: Deceiver(ProfileService, {
            putExpertProfileRoute: jasmine.createSpy('putExpertProfileRoute'),
            getProfileRoute: jasmine.createSpy('getProfileRoute'),
          }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jasmine.createSpy('pushDangerAlert') }),
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

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(EditProfileComponentService);
    profileService = TestBed.get(ProfileService);
  });

  it('should edit expert profile', () => {
    profileService.putExpertProfileRoute = jest.fn(() => cold('-a|', { a: 'OK' }));
    const expertDetailsObject: PutExpertDetails = {
      name: 'name',
      avatar: 'avaar',
      description: 'description',
      files: [],
      links: [],
    };

    service.editExpertProfile(expertDetailsObject);
    expect(profileService.putExpertProfileRoute).toHaveBeenCalledWith(expertDetailsObject);
  });

  it('should edit client profile', () => {
    const accountService: AccountService = TestBed.get(AccountService);
    accountService.putGeneralSettingsRoute = jest.fn(() => cold('-a|', { a: 'OK' }));
    const clientDetailsObject: PutGeneralSettings = {
      nickname: 'nick',
      avatar: 'avatar',
    };

    service.editClientProfile(clientDetailsObject);
    expect(accountService.putGeneralSettingsRoute).toHaveBeenCalledWith(clientDetailsObject);
  });

  describe('getModalData', () => {
    it('should get modal data for expert', () => {
      dispatchLoggedUser(store, { account: { id: 123 }, isExpert: true });
      profileService.getProfileRoute = jest.fn(() => cold('-a|', { a: 'XD' }));
      const result = {
        getSessionWithAccount: { account: { id: 123 }, isExpert: true },
        getProfileWithDocuments: 'XD',
      };
      const expected = cold('-a|', { a: result });
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should get modal data for non expert profile', () => {
      dispatchLoggedUser(store, { account: { id: 123 }, isExpert: false });
      profileService.getProfileRoute = jest.fn(() => cold('---a|', { a: 'XD' }));
      const result = {
        getSessionWithAccount: { account: { id: 123 }, isExpert: false },
        getProfileWithDocuments: undefined,
      };
      const expected = cold('(a|)', { a: result });
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should throw error when profile errors out', () => {
      dispatchLoggedUser(store, { account: { id: 123 }, isExpert: true });
      profileService.getProfileRoute = jest.fn(() => cold('-#', {}, 'error'));
      const expected = cold('-#', {}, 'error');
      expect(service.getModalData()).toBeObservable(expected);
    });
  });
});
