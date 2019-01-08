import { TestBed } from '@angular/core/testing';
import { ProfileService, ServiceService, PostProfileDetails } from '@anymind-ng/api';
import { CreateOrganizationComponentService } from './create-organization.component.service';
import { importStore, provideMockFactoryLogger, dispatchLoggedUser } from 'testing/testing';
import { Deceiver } from 'deceiver-core';
import { Store } from '@ngrx/store';
import { AlertService } from '@anymind-ng/core';
import { PostProfileWithInvoiceDetails } from '@anymind-ng/api/model/postProfileWithInvoiceDetails';
import { cold } from 'jasmine-marbles';

describe('CreateOrganizationComponentService', () => {
  let store: Store<any>;
  let service: CreateOrganizationComponentService;
  let profileService: ProfileService;
  let alertService: AlertService;
  const organizationDetailsObject: PostProfileDetails = {
    profileType: PostProfileDetails.ProfileTypeEnum.ORG,
    name: 'name',
    avatar: 'logo',
    description: 'description',
    files: [],
    links: [],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        CreateOrganizationComponentService,
        provideMockFactoryLogger(),
        {
          provide: ProfileService,
          useValue: Deceiver(ProfileService, {
            postCreateProfileWithInvoiceDetailsRoute: jest.fn(),
            postProfileValidateRoute: jest.fn(),
          }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jest.fn() }),
        },
        {
          provide: ServiceService,
          useValue: Deceiver(ServiceService, { getProfileServicesRoute: jest.fn() }),
        },
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(CreateOrganizationComponentService);
    profileService = TestBed.get(ProfileService);
    alertService = TestBed.get(AlertService);
    dispatchLoggedUser(store, { account: { id: '123', countryISO: 'pl' } });
  });

  it('should get initial data', () => {
    const serviceService: ServiceService = TestBed.get(ServiceService);
    serviceService.getProfileServicesRoute = jest.fn(() => cold('-a|', { a: [] }));
    const result = {
      countryIso: 'pl',
      hasConsultations: false,
    };
    const expected = cold('-a|', { a: result });
    expect(service.getInitialData()).toBeObservable(expected);
  });

  it('should create organization profile', () => {
    profileService.postCreateProfileWithInvoiceDetailsRoute = jest.fn(() => cold('-a|', { a: 'OK' }));
    const organizationProfileObject: PostProfileWithInvoiceDetails = {
      profileDetails: organizationDetailsObject,
    };
    service.createOrganizationProfile(organizationProfileObject);
    expect(profileService.postCreateProfileWithInvoiceDetailsRoute).toHaveBeenCalledWith(organizationProfileObject);
  });

  it('should throw error when create organization details failed', () => {
    profileService.postCreateProfileWithInvoiceDetailsRoute = jest.fn(() => cold('-#', {}, 'error'));
    const organizationProfileObject: PostProfileWithInvoiceDetails = {
      profileDetails: organizationDetailsObject,
    };
    const expected = cold('-#', {}, 'error');
    expect(service.createOrganizationProfile(organizationProfileObject)).toBeObservable(expected);
    expect(alertService.pushDangerAlert).toHaveBeenCalled();
  });

  it('should validate organization details', () => {
    profileService.postProfileValidateRoute = jest.fn(() => cold('-a|', { a: 'OK' }));
    service.validateOrganizationDetails(organizationDetailsObject);
    expect(profileService.postProfileValidateRoute).toHaveBeenCalledWith(organizationDetailsObject);
  });

  it('should throw error when validate organization details failed', () => {
    profileService.postProfileValidateRoute = jest.fn(() => cold('-#', {}, 'error'));
    const expected = cold('-#', {}, 'error');
    expect(service.validateOrganizationDetails(organizationDetailsObject)).toBeObservable(expected);
    expect(alertService.pushDangerAlert).toHaveBeenCalled();
  });
});
