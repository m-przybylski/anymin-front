import { ActivatedRouteSnapshot, ParamMap, Router } from '@angular/router';
import { Deceiver } from 'deceiver-core';
import { ViewsService, ProfileService } from '@anymind-ng/api';
import { UserSessionService } from '@platform/core/services/user-session/user-session.service';
import { cold } from 'jasmine-marbles';
import * as Mocks from './company-mock';
import { fakeAsync } from '@angular/core/testing';
import { CompanyProfileResolverService } from './company-profile-resolver.service';

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
  const userSessionService: UserSessionService = Deceiver(UserSessionService, { getSession: jasmine.createSpy('') });
  const route: ActivatedRouteSnapshot = Deceiver(ActivatedRouteSnapshot, {
    paramMap,
  });

  let service: CompanyProfileResolverService;
  beforeEach(() => {
    service = new CompanyProfileResolverService(viewsService, router, userSessionService, profileService);
  });

  it('should make return resolved data', fakeAsync(() => {
    // prepare data
    const getSession = Promise.resolve({ account: { id: '123' } });
    const organizationView = cold('-a|', { a: Mocks.organizationProfileView });
    const profile = cold('-a|', { a: Mocks.profileWithDocuments });

    // mock functoins
    (userSessionService.getSession as jasmine.Spy).and.returnValue(getSession);
    (viewsService.getWebOrganizationProfileRoute as jasmine.Spy).and.returnValue(organizationView);
    (profileService.getProfileRoute as jasmine.Spy).and.returnValue(profile);
    // expect result
    service.resolve(route).subscribe(value => {
      expect(value).toEqual(Mocks.companyProfileView);
    });
  }));

  it('should make return resolved and filtered data', fakeAsync(() => {
    // prepare data
    const getSession = Promise.resolve({ account: { id: '123' } });
    const organizationView = cold('-a|', { a: Mocks.organizationProfileView1 });
    const profile = cold('-a|', { a: Mocks.profileWithDocuments });

    // mock functoins
    (userSessionService.getSession as jasmine.Spy).and.returnValue(getSession);
    (viewsService.getWebOrganizationProfileRoute as jasmine.Spy).and.returnValue(organizationView);
    (profileService.getProfileRoute as jasmine.Spy).and.returnValue(profile);
    // expect result
    service.resolve(route).subscribe(value => {
      expect(value).toEqual(Mocks.companyProfileView1);
    });
  }));
});
