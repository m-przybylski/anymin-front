// tslint:disable:no-empty

import { TestBed } from '@angular/core/testing';
import { ProfileService, PutOrganizationDetails, ServiceService } from '@anymind-ng/api';
import { CreateOrganizationModalComponentService } from './create-organization.component.service';
import { importStore, provideMockFactoryLogger, dispatchLoggedUser } from 'testing/testing';
import { Deceiver } from 'deceiver-core';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { AlertService } from '@anymind-ng/core';
import { of } from 'rxjs';

describe('CreateOrganizationModalComponentService', () => {
  let store: Store<any>;
  let service: CreateOrganizationModalComponentService;
  let profileService: ProfileService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        CreateOrganizationModalComponentService,
        provideMockFactoryLogger(),
        {
          provide: ProfileService,
          useValue: Deceiver(ProfileService, {
            putOrganizationProfileRoute: jest.fn(() => of({})),
            getProfileRoute: jest.fn(),
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
    service = TestBed.get(CreateOrganizationModalComponentService);
    profileService = TestBed.get(ProfileService);
    dispatchLoggedUser(store, { account: { id: '123' } });
  });

  it('should create organization profile', () => {
    const clientDetailsObject: PutOrganizationDetails = {
      name: 'name',
      logo: 'logo',
      description: 'description',
      files: [],
      links: [],
    };

    service.createOrganizationProfile(clientDetailsObject);
    expect(profileService.putOrganizationProfileRoute).toHaveBeenCalledWith(clientDetailsObject);
  });

  describe('getModalData', () => {
    it('should return data if company exists and account consultation exists flag', () => {
      const serviceService = TestBed.get(ServiceService);
      // mock isCompany
      dispatchLoggedUser(store, { account: { id: '123' }, isCompany: true });
      const expected = cold('--(a|)', { a: { getProfileWithDocuments: 'jest!', hasConsultations: true } });

      profileService.getProfileRoute = jest.fn(() => cold('-(a|)', { a: 'jest!' }));
      serviceService.getProfileServicesRoute = jest.fn(() => cold('--(a|)', { a: [1] }));
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should return empty data if company not exists in session and account consultation exists flag', () => {
      const serviceService = TestBed.get(ServiceService);
      // mock isCompany
      dispatchLoggedUser(store, { account: { id: '123' }, isCompany: false });
      const expected = cold('--(a|)', { a: { getProfileWithDocuments: undefined, hasConsultations: true } });

      profileService.getProfileRoute = jest.fn(() => cold('-----(a|)', { a: 'jest!' }));
      serviceService.getProfileServicesRoute = jest.fn(() => cold('--(a|)', { a: [1] }));
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should return empty data if company not false if no consultation exists', () => {
      const serviceService = TestBed.get(ServiceService);
      // mock isCompany
      dispatchLoggedUser(store, { account: { id: '123' }, isCompany: false });
      const expected = cold('--(a|)', { a: { getProfileWithDocuments: undefined, hasConsultations: true } });

      profileService.getProfileRoute = jest.fn(() => cold('-----(a|)', { a: 'jest!' }));
      serviceService.getProfileServicesRoute = jest.fn(() => cold('--(a|)', { a: [1] }));
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should throw error on getProfileServicesRoute HTTP error', () => {
      const serviceService = TestBed.get(ServiceService);
      // mock isCompany
      dispatchLoggedUser(store, { account: { id: '123' }, isCompany: false });
      const expected = cold('--#', {}, 'error');

      profileService.getProfileRoute = jest.fn(() => cold('-----(a|)', { a: 'jest!' }));
      serviceService.getProfileServicesRoute = jest.fn(() => cold('--#', {}, 'error'));
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should throw error on getProfileRoute HTTP error', () => {
      const serviceService = TestBed.get(ServiceService);
      // mock isCompany
      dispatchLoggedUser(store, { account: { id: '123' }, isCompany: true });
      const expected = cold('--#', {}, 'error');

      profileService.getProfileRoute = jest.fn(() => cold('--#', { a: 'jest!' }));
      serviceService.getProfileServicesRoute = jest.fn(() => cold('--(a|)', { a: [1] }));
      expect(service.getModalData()).toBeObservable(expected);
    });
  });
});
