import { TestBed } from '@angular/core/testing';
import { ProfileService, ServiceService, PostProfileDetails, AccountService } from '@anymind-ng/api';
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
  let accountService: AccountService;
  let serviceService: ServiceService;
  const organizationDetailsObject: PostProfileDetails = {
    profileType: PostProfileDetails.ProfileTypeEnum.ORG,
    name: 'name',
    avatar: 'logo',
    description: 'description',
    files: [],
    links: [],
  };
  const getInvoiceDetails = {
    id: '12312444',
    accountId: '123132123',
    invoiceDetailsType: 'COMPANY',
    firstName: 'sdfsfsd',
    lastName: 'sdfasdfasdf',
    companyName: 'sadfasdfasd',
    vatNumber: '0000000000',
    address: {
      street: 'sadfsadf',
      streetNumber: 'sdf',
      apartmentNumber: '1231',
      city: 'afsdfdsf',
      postalCode: '12333',
      countryISO: 'pl',
    },
    vatRateType: 'COMPANY_23',
    createdAt: new Date('2019-01-08T12:27:00.343Z'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        CreateOrganizationComponentService,
        provideMockFactoryLogger(),
        {
          provide: ProfileService,
          useValue: Deceiver(ProfileService),
        },
        {
          provide: AccountService,
          useValue: Deceiver(AccountService),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jest.fn() }),
        },
        {
          provide: ServiceService,
          useValue: Deceiver(ServiceService),
        },
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(CreateOrganizationComponentService);
    profileService = TestBed.get(ProfileService);
    alertService = TestBed.get(AlertService);
    accountService = TestBed.get(AccountService);
    serviceService = TestBed.get(ServiceService);
    dispatchLoggedUser(store, { account: { id: '123', countryISO: 'pl' } });
  });

  describe('getInitialData', () => {
    it('should get initial data', () => {
      serviceService.getProfileServicesRoute = jest.fn(() => cold('-a|', { a: [] }));
      accountService.getInvoiceDetailsRoute = jest.fn(() => cold('-a|', { a: getInvoiceDetails }));
      const result = {
        getInvoiceDetails,
        countryIso: 'pl',
        hasConsultations: false,
      };
      const expected = cold('--(a|)', { a: result });
      expect(service.getInitialData()).toBeObservable(expected);
    });

    it('should not throw error when getInvoiceDetailsRoute fails with error == 404', () => {
      const fakeError = {
        status: 404,
        message: '💩 happens',
      };
      serviceService.getProfileServicesRoute = jest.fn(() => cold('-a|', { a: [] }));
      accountService.getInvoiceDetailsRoute = jest.fn(() => cold('-#', {}, fakeError));
      const result = {
        getInvoiceDetails: undefined,
        countryIso: 'pl',
        hasConsultations: false,
      };
      const expected = cold('--(a|)', { a: result });
      expect(service.getInitialData()).toBeObservable(expected);
    });

    it('should throw error when getInvoiceDetailsRoute fails with error != 404', () => {
      const fakeError = {
        status: 500,
        message: '💩 happens',
      };
      serviceService.getProfileServicesRoute = jest.fn(() => cold('-a|', { a: [] }));
      accountService.getInvoiceDetailsRoute = jest.fn(() => cold('-#', {}, fakeError));
      const expected = cold('-#', {}, fakeError);
      expect(service.getInitialData()).toBeObservable(expected);
    });

    it('should throw error when getProfileServicesRoute fails', () => {
      const fakeError = {
        status: 404,
        message: '💩 happens',
      };
      serviceService.getProfileServicesRoute = jest.fn(() => cold('-#', {}, fakeError));
      accountService.getInvoiceDetailsRoute = jest.fn(() => cold('-a|', { a: getInvoiceDetails }));
      const expected = cold('-#', {}, fakeError);
      expect(service.getInitialData()).toBeObservable(expected);
    });
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
