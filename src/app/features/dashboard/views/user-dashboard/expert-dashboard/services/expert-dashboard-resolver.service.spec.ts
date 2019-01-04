import { ActivatedRouteSnapshot, ParamMap, Router } from '@angular/router';
import { Deceiver } from 'deceiver-core';
import { ViewsService, ProfileService } from '@anymind-ng/api';
import { ExpertDashboardResolverService } from './expert-dashboard-resolver.service';
import { cold } from 'jasmine-marbles';
import * as Mocks from './expert-mock';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { importStore, dispatchLoggedUser } from 'testing/testing';

describe('ExpertDashboardResolverService', () => {
  const paramMap: ParamMap = {
    get: jest.fn(),
    has: jest.fn(),
    getAll: jest.fn(),
    keys: [],
  };
  const viewsService: ViewsService = Deceiver(ViewsService, {
    getWebExpertProfileRoute: jest.fn(),
  });
  const router: Router = Deceiver(Router);
  const route: ActivatedRouteSnapshot = Deceiver(ActivatedRouteSnapshot, {
    paramMap,
  });
  const profileService: ProfileService = Deceiver(ProfileService, {
    getProfileRoute: jest.fn(),
  });

  let service: ExpertDashboardResolverService;
  let store: Store<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
    });
    store = TestBed.get(Store);
    dispatchLoggedUser(store, { isCompany: false, account: { id: '123' } });
    service = new ExpertDashboardResolverService(viewsService, router, profileService, store);
  });

  beforeEach(() => {
    const getProfile = cold('-a|', { a: Mocks.getProfileWithDocuments });
    (profileService.getProfileRoute as jest.Mock).mockReturnValue(getProfile);
  });

  it('should make return resolved data', fakeAsync(() => {
    // prepare data
    const expertView = cold('-a|', { a: Mocks.expertProfileView });

    // mock functions
    (viewsService.getWebExpertProfileRoute as jest.Mock).mockReturnValue(expertView);

    // expect result
    service.resolve(route).subscribe(value => {
      expect(value).toEqual(Mocks.expertProfileViewResult);
    });
  }));

  it('should make return resolved and filtered data', fakeAsync(() => {
    // prepare data
    const expertView = cold('-a|', { a: Mocks.expertProfileView1 });

    // mock functoins
    (viewsService.getWebExpertProfileRoute as jest.Mock).mockReturnValue(expertView);

    // expect result
    service.resolve(route).subscribe(value => {
      expect(value).toEqual(Mocks.expertProfileViewResult1);
    });
  }));
});
