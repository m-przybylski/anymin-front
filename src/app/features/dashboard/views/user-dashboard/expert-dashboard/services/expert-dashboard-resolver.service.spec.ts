import { ActivatedRouteSnapshot, ParamMap, Router } from '@angular/router';
import { Deceiver } from 'deceiver-core';
import { ViewsService } from '@anymind-ng/api';
import { ExpertDashboardResolverService } from './expert-dashboard-resolver.service';
import { UserSessionService } from '@platform/core/services/user-session/user-session.service';
import { cold } from 'jasmine-marbles';
import * as Mocks from './expert-mock';
import { fakeAsync } from '@angular/core/testing';

describe('ExpertDashboardResolverService', () => {
  const paramMap: ParamMap = {
    get: jasmine.createSpy('get').and.returnValue('123'),
    has: jasmine.createSpy('has'),
    getAll: jasmine.createSpy('getAll'),
    keys: [],
  };
  const viewsService: ViewsService = Deceiver(ViewsService, {
    getWebExpertProfileRoute: jasmine.createSpy('getWebExpertProfileRoute'),
  });
  const router: Router = Deceiver(Router);
  const userSessionService: UserSessionService = Deceiver(UserSessionService, { getSession: jasmine.createSpy('') });
  const route: ActivatedRouteSnapshot = Deceiver(ActivatedRouteSnapshot, {
    paramMap,
  });

  let service: ExpertDashboardResolverService;
  beforeEach(() => {
    service = new ExpertDashboardResolverService(viewsService, router, userSessionService);
  });

  it('should make return resolved data', fakeAsync(() => {
    // prepare data
    const getSession = Promise.resolve({ account: { id: '123' } });
    const expertView = cold('-a|', { a: Mocks.expertProfileView });

    // mock functoins
    (userSessionService.getSession as jasmine.Spy).and.returnValue(getSession);
    (viewsService.getWebExpertProfileRoute as jasmine.Spy).and.returnValue(expertView);

    // expect result
    service.resolve(route).subscribe(value => {
      expect(value).toEqual(Mocks.expertProfileViewResult);
    });
  }));

  it('should make return resolved and filtered data', fakeAsync(() => {
    // prepare data
    const getSession = Promise.resolve({ account: { id: '123' } });
    const expertView = cold('-a|', { a: Mocks.expertProfileView1 });

    // mock functoins
    (userSessionService.getSession as jasmine.Spy).and.returnValue(getSession);
    (viewsService.getWebExpertProfileRoute as jasmine.Spy).and.returnValue(expertView);

    // expect result
    service.resolve(route).subscribe(value => {
      expect(value).toEqual(Mocks.expertProfileViewResult1);
    });
  }));
});
