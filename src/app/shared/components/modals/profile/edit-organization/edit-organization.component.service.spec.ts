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
            getProfileRoute: jest.fn(),
            getProfileWithServicesRoute: jest.fn(),
          }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jasmine.createSpy('pushDangerAlert') }),
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
      // mock isCompany
      dispatchLoggedUser(store, {
        account: { id: '123' },
        session: { organizationProfileId: 'fake org profile id' },
        isCompany: true,
      });
      const expected = cold('--(a|)', { a: { getProfileWithDocuments: 'jest!', hasConsultations: true } });

      profileService.getProfileRoute = jest.fn(() => cold('-(a|)', { a: 'jest!' }));
      profileService.getProfileWithServicesRoute = jest.fn(() => cold('--(a|)', { a: [1] }));
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should return empty data if company not exists in session and account consultation exists flag', () => {
      // mock isCompany
      dispatchLoggedUser(store, {
        account: { id: '123' },
        session: { organizationProfileId: 'fake org profile id' },
        isCompany: false,
      });
      const expected = cold('--(a|)', { a: { getProfileWithDocuments: undefined, hasConsultations: true } });

      profileService.getProfileWithServicesRoute = jest.fn(() => cold('--(a|)', { a: [1] }));
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should return empty data if company not false if no consultation exists', () => {
      // mock isCompany
      dispatchLoggedUser(store, {
        account: { id: '123' },
        session: { organizationProfileId: 'fake org profile id' },
        isCompany: false,
      });
      const expected = cold('--(a|)', { a: { getProfileWithDocuments: undefined, hasConsultations: true } });

      profileService.getProfileWithServicesRoute = jest.fn(() => cold('--(a|)', { a: [1] }));
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should throw error on getProfileServicesRoute HTTP error', () => {
      // mock isCompany
      dispatchLoggedUser(store, {
        account: { id: '123' },
        session: { organizationProfileId: 'organizationProfileId' },
        isCompany: false,
      });
      const expected = cold('--#', {}, 'error');

      profileService.getProfileWithServicesRoute = jest.fn(() => cold('--#', {}, 'error'));
      expect(service.getModalData()).toBeObservable(expected);
    });
    it('should throw error on getProfileRoute HTTP error', () => {
      // mock isCompany
      dispatchLoggedUser(store, {
        account: { id: '123' },
        session: { organizationProfileId: 'organizationProfileId' },
        isCompany: true,
      });
      const expected = cold('--#', {}, 'error');

      profileService.getProfileRoute = jest.fn(() => cold('--#', { a: 'jest!' }));
      profileService.getProfileWithServicesRoute = jest.fn(() => cold('--(a|)', { a: [1] }));
      expect(service.getModalData()).toBeObservable(expected);
    });
  });
});
