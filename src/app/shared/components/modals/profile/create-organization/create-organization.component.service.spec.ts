// tslint:disable:no-empty

import { TestBed } from '@angular/core/testing';
import { ProfileService, PutOrganizationDetails, ServiceService } from '@anymind-ng/api';
import { CreateOrganizationModalComponentService } from './create-organization.component.service';
import { importStore, provideMockFactoryLogger, dispatchLoggedUser } from 'testing/testing';
import { Deceiver } from 'deceiver-core';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';

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
            putOrganizationProfileRoute: jasmine.createSpy('putOrganizationProfileRoute'),
            getProfileRoute: jasmine.createSpy('getProfileRoute'),
          }),
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
    service = TestBed.get(CreateOrganizationModalComponentService);
    profileService = TestBed.get(ProfileService);
    dispatchLoggedUser(store, { account: { id: '123' } });
  });

  it('getProfileDetails ', () => {
    (profileService.getProfileRoute as jasmine.Spy).and.returnValue(cold('-a|', { a: 'ok' }));
    expect(service.getProfileDetails()).toBeObservable(cold('-a', { a: 'ok' }));
  });

  it('should get organization profile', () => {
    const serviceService = TestBed.get(ServiceService);
    const accountId = '1234';

    service.getProfileService(accountId);
    expect(serviceService.getProfileServicesRoute).toHaveBeenCalledWith(accountId);
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
});
