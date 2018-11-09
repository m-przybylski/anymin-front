import { ActivatedRouteSnapshot, ParamMap, Router } from '@angular/router';
import { Deceiver } from 'deceiver-core';
import { ViewsService, ProfileService } from '@anymind-ng/api';
import { cold } from 'jasmine-marbles';
import * as Mocks from './company-mock';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { CompanyProfileResolverService } from './company-profile-resolver.service';
import { importStore, dispatchLoggedUser } from 'testing/testing';
import { Store } from '@ngrx/store';

describe('CompanyProfileResolverService', () => {
  const paramMap: ParamMap = {
    get: jasmine.createSpy('get').and.returnValue('123'),
    has: jasmine.createSpy('has'),
    getAll: jasmine.createSpy('getAll'),
    keys: [],
  };
  const viewsService: ViewsService = Deceiver(ViewsService, {
    getWebOrganizationProfileRoute: jasmine.createSpy('getWebOrganizationProfileRoute'),
  });
  const router: Router = Deceiver(Router);
  const profileService: ProfileService = Deceiver(ProfileService, { getProfileRoute: jasmine.createSpy('') });
  const route: ActivatedRouteSnapshot = Deceiver(ActivatedRouteSnapshot, {
    paramMap,
  });

  let service: CompanyProfileResolverService;
  let store: Store<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
    });
    store = TestBed.get(Store);
    dispatchLoggedUser(store, { isCompany: true, account: { id: '123' } });

    service = new CompanyProfileResolverService(viewsService, router, profileService, store);
  });

  it('should make return resolved data', fakeAsync(() => {
    // prepare data
    const organizationView = cold('-a|', { a: Mocks.organizationProfileView });
    const profile = cold('-a|', { a: Mocks.profileWithDocuments });

    // mock functoins
    (viewsService.getWebOrganizationProfileRoute as jasmine.Spy).and.returnValue(organizationView);
    (profileService.getProfileRoute as jasmine.Spy).and.returnValue(profile);
    // expect result
    service.resolve(route).subscribe(value => {
      expect(value).toEqual(Mocks.companyProfileView);
    });
  }));

  it('should make return resolved and filtered data', fakeAsync(() => {
    // prepare data
    const organizationView = cold('-a|', { a: Mocks.organizationProfileView1 });
    const profile = cold('-a|', { a: Mocks.profileWithDocuments });

    // mock functoins
    (viewsService.getWebOrganizationProfileRoute as jasmine.Spy).and.returnValue(organizationView);
    (profileService.getProfileRoute as jasmine.Spy).and.returnValue(profile);
    // expect result
    service.resolve(route).subscribe(value => {
      expect(value).toEqual(Mocks.companyProfileView1);
    });
  }));
});
