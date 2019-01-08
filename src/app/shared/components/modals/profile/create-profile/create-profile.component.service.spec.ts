import { TestBed } from '@angular/core/testing';
import {
  AccountService,
  ProfileService,
  PutGeneralSettings,
  PostProfileDetails,
  PostProfileWithInvoiceDetails,
} from '@anymind-ng/api';
import { CreateProfileComponentService } from './create-profile.component.service';
import { Deceiver } from 'deceiver-core';
import { importStore, provideMockFactoryLogger } from 'testing/testing';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { AlertService } from '@anymind-ng/core';
import { dispatchLoggedUser } from '../../../../../../testing/testing';

describe('CreateProfileComponentService', () => {
  let store: Store<any>;
  let service: CreateProfileComponentService;
  let profileService: ProfileService;
  let accountService: AccountService;
  let alertService: AlertService;
  const expertDetailsObject: PostProfileDetails = {
    profileType: PostProfileDetails.ProfileTypeEnum.EXP,
    name: 'name',
    avatar: 'avatar',
    description: 'description',
    files: [],
    links: [],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        provideMockFactoryLogger(),
        CreateProfileComponentService,
        {
          provide: ProfileService,
          useValue: Deceiver(ProfileService, {
            postCreateProfileWithInvoiceDetailsRoute: jest.fn(),
            getProfileRoute: jest.fn(),
            postProfileValidateRoute: jest.fn(),
          }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jest.fn() }),
        },
        {
          provide: AccountService,
          useValue: Deceiver(AccountService, {
            putGeneralSettingsRoute: jest.fn(),
          }),
        },
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(CreateProfileComponentService);
    profileService = TestBed.get(ProfileService);
    alertService = TestBed.get(AlertService);
    accountService = TestBed.get(AccountService);
  });

  it('should get user country ISO code', () => {
    const mockSession = {
      account: {
        countryISO: 'pl',
      },
      isExpert: false,
      isCompany: false,
    };
    dispatchLoggedUser(store, mockSession);
    const expected = cold('(a|)', { a: { countryISO: 'pl', hasProfile: false } });
    expect(service.getCountryIsoAndProfile()).toBeObservable(expected);
  });

  it('should throw error when create expert profile failed', () => {
    profileService.postCreateProfileWithInvoiceDetailsRoute = jest.fn(() => cold('-#', {}, 'error'));
    const expected = cold('-#', {}, 'error');
    const profileDetailsObject: PostProfileWithInvoiceDetails = {
      profileDetails: expertDetailsObject,
    };
    expect(service.createExpertProfile(profileDetailsObject)).toBeObservable(expected);
    expect(alertService.pushDangerAlert).toHaveBeenCalled();
  });

  it('should create client profile', () => {
    (accountService.putGeneralSettingsRoute as jest.Mock).mockReturnValue(cold('-a|', { a: 'OK' }));
    const clientDetailsObject: PutGeneralSettings = {
      nickname: 'nick',
      avatar: 'avatar',
    };
    service.createClientProfile(clientDetailsObject);
    expect(accountService.putGeneralSettingsRoute).toHaveBeenCalledWith(clientDetailsObject);
  });

  it('should throw error when create client profile failed', () => {
    accountService.putGeneralSettingsRoute = jest.fn(() => cold('-#', {}, 'error'));
    const expected = cold('-#', {}, 'error');
    const clientDetailsObject: PutGeneralSettings = {
      nickname: 'nick',
      avatar: 'avatar',
    };
    expect(service.createClientProfile(clientDetailsObject)).toBeObservable(expected);
    expect(alertService.pushDangerAlert).toHaveBeenCalled();
  });

  it('should validate expert details', () => {
    profileService.postProfileValidateRoute = jest.fn(() => cold('-a|', { a: 'OK' }));
    service.validateProfileDetails(expertDetailsObject);
    expect(profileService.postProfileValidateRoute).toHaveBeenCalledWith(expertDetailsObject);
  });

  it('should throw error when validate expert details failed', () => {
    profileService.postProfileValidateRoute = jest.fn(() => cold('-#', {}, 'error'));
    const expected = cold('-#', {}, 'error');
    expect(service.validateProfileDetails(expertDetailsObject)).toBeObservable(expected);
    expect(alertService.pushDangerAlert).toHaveBeenCalled();
  });
});
