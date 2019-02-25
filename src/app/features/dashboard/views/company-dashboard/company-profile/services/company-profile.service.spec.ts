import { Router } from '@angular/router';
import { Deceiver } from 'deceiver-core';
import { ViewsService, ProfileService } from '@anymind-ng/api';
import { cold } from 'jasmine-marbles';
import * as Mocks from './company-mock';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { importStore, dispatchLoggedUser } from 'testing/testing';
import { Store } from '@ngrx/store';
import { CompanyProfileService } from './company-profile.service';

describe('CompanyProfileResolverService', () => {
  const viewsService: ViewsService = Deceiver(ViewsService, {
    getWebOrganizationProfileRoute: jest.fn(),
  });
  const router: Router = Deceiver(Router);
  const profileService: ProfileService = Deceiver(ProfileService, { getProfileRoute: jest.fn() });

  let service: CompanyProfileService;
  let store: Store<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
    });
    store = TestBed.get(Store);
    dispatchLoggedUser(store, { isCompany: true, account: { id: '123' } });

    service = new CompanyProfileService(viewsService, router, profileService, store);
  });

  it('should make return resolved data', fakeAsync(() => {
    // prepare data
    const organizationView = cold('-a|', { a: Mocks.organizationProfileView });
    const profile = cold('-a|', { a: Mocks.profileWithDocuments });

    // mock functions
    (viewsService.getWebOrganizationProfileRoute as jest.Mock).mockReturnValue(organizationView);
    (profileService.getProfileRoute as jest.Mock).mockReturnValue(profile);
    // expect result
    expect(service.getOrganizationData('fake profile')).toBeObservable(cold('--(a|)', { a: Mocks.companyProfileView }));
  }));

  it('should make return resolved and filtered data', fakeAsync(() => {
    // prepare data
    const organizationView = cold('-a|', { a: Mocks.organizationProfileView1 });
    const profile = cold('-a|', { a: Mocks.profileWithDocuments });

    // mock functions
    (viewsService.getWebOrganizationProfileRoute as jest.Mock).mockReturnValue(organizationView);
    (profileService.getProfileRoute as jest.Mock).mockReturnValue(profile);
    // expect result
    expect(service.getOrganizationData('fake profile')).toBeObservable(
      cold('--(a|)', { a: Mocks.companyProfileView1 }),
    );
  }));
});
