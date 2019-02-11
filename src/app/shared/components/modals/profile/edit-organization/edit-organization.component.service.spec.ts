// tslint:disable:no-empty
import { TestBed } from '@angular/core/testing';
import { ProfileService, PutProfileDetails, ServiceService } from '@anymind-ng/api';
import { EditOrganizationComponentService } from './edit-organization.component.service';
import { importStore, provideMockFactoryLogger, dispatchLoggedUser } from 'testing/testing';
import { Deceiver } from 'deceiver-core';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { AlertService } from '@anymind-ng/core';
import { of } from 'rxjs';

describe('EditOrganizationComponentService', () => {
  let store: Store<any>;
  let service: EditOrganizationComponentService;
  let profileService: ProfileService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        EditOrganizationComponentService,
        provideMockFactoryLogger(),
        {
          provide: ProfileService,
          useValue: Deceiver(ProfileService, {
            putProfileRoute: jest.fn(() => of(undefined)),
            getProfileRoute: jasmine.createSpy('getProfileRoute'),
          }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jasmine.createSpy('pushDangerAlert') }),
        },
        {
          provide: ServiceService,
          useValue: Deceiver(ServiceService, { getProfileServicesRoute: jasmine.createSpy('getProfileServicesRoute') }),
        },
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(EditOrganizationComponentService);
    profileService = TestBed.get(ProfileService);
    dispatchLoggedUser(store, { account: { id: '123' } });
  });

  it('should edit organization profile', () => {
    const organizationDetailsObject: PutProfileDetails = {
      name: 'name',
      avatar: 'logo',
      description: 'description',
      files: [],
      links: [],
    };

    service.editOrganizationProfile(organizationDetailsObject, 'profileId');
    expect(profileService.putProfileRoute).toHaveBeenCalledWith(organizationDetailsObject, 'profileId');
  });

  describe('getModalData', () => {
    it('should return data if company exists and account consultation exists flag', () => {
      const serviceService = TestBed.get(ServiceService);
      // mock isCompany
      dispatchLoggedUser(store, {
        account: { id: '123' },
        session: { organizationProfileId: 'organizationProfileId' },
        isCompany: true,
      });
      const expected = cold('--(a|)', { a: { getProfileWithDocuments: 'jest!', hasConsultations: true } });

      profileService.getProfileRoute = jest.fn(() => cold('-(a|)', { a: 'jest!' }));
      serviceService.getProfileServicesRoute = jest.fn(() => cold('--(a|)', { a: [1] }));
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should return empty data if company not exists in session and account consultation exists flag', () => {
      const serviceService = TestBed.get(ServiceService);
      // mock isCompany
      dispatchLoggedUser(store, {
        account: { id: '123' },
        session: { organizationProfileId: 'organizationProfileId' },
        isCompany: false,
      });
      const expected = cold('--(a|)', { a: { getProfileWithDocuments: undefined, hasConsultations: true } });

      profileService.getProfileRoute = jest.fn(() => cold('-----(a|)', { a: 'jest!' }));
      serviceService.getProfileServicesRoute = jest.fn(() => cold('--(a|)', { a: [1] }));
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should return empty data if company not false if no consultation exists', () => {
      const serviceService = TestBed.get(ServiceService);
      // mock isCompany
      dispatchLoggedUser(store, {
        account: { id: '123' },
        session: { organizationProfileId: 'ididid' },
        isCompany: false,
      });
      const expected = cold('--(a|)', { a: { getProfileWithDocuments: undefined, hasConsultations: true } });

      profileService.getProfileRoute = jest.fn(() => cold('-----(a|)', { a: 'jest!' }));
      serviceService.getProfileServicesRoute = jest.fn(() => cold('--(a|)', { a: [1] }));
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should throw error on getProfileServicesRoute HTTP error', () => {
      const serviceService = TestBed.get(ServiceService);
      // mock isCompany
      dispatchLoggedUser(store, {
        account: { id: '123' },
        session: { organizationProfileId: 'organizationProfileId' },
        isCompany: false,
      });
      const expected = cold('--#', {}, 'error');

      profileService.getProfileRoute = jest.fn(() => cold('-----(a|)', { a: 'jest!' }));
      serviceService.getProfileServicesRoute = jest.fn(() => cold('--#', {}, 'error'));
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should throw error on getProfileRoute HTTP error', () => {
      const serviceService = TestBed.get(ServiceService);
      // mock isCompany
      dispatchLoggedUser(store, {
        account: { id: '123' },
        session: { organizationProfileId: 'organizationProfileId' },
        isCompany: true,
      });
      const expected = cold('--#', {}, 'error');

      profileService.getProfileRoute = jest.fn(() => cold('--#', { a: 'jest!' }));
      serviceService.getProfileServicesRoute = jest.fn(() => cold('--(a|)', { a: [1] }));
      expect(service.getModalData()).toBeObservable(expected);
    });
  });
});
