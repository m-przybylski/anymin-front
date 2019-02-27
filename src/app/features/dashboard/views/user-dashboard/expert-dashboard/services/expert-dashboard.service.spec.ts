import { Router } from '@angular/router';
import { Deceiver } from 'deceiver-core';
import { ViewsService, ProfileService, GetService, EmploymentWithService } from '@anymind-ng/api';
import { ExpertDashboardService } from './expert-dashboard.service';
import { cold } from 'jasmine-marbles';
import * as Mocks from './expert-mock';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { importStore, dispatchLoggedUser } from 'testing/testing';
import { of } from 'rxjs';
import { ExpertDashboardActions } from '../actions';
import { ConsultationDetailActions } from '@platform/shared/components/modals/consultation-details/actions';

describe('ExpertDashboardResolverService', () => {
  const viewsService: ViewsService = Deceiver(ViewsService, {
    getWebExpertProfileRoute: jest.fn(),
  });
  const router: Router = Deceiver(Router);
  const profileService: ProfileService = Deceiver(ProfileService, {
    getProfileRoute: jest.fn(),
  });

  let service: ExpertDashboardService;
  let store: Store<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
    });
    store = TestBed.get(Store);
    dispatchLoggedUser(store, { isCompany: false, account: { id: '123', vatRateType: 'fake vat' } });
    service = new ExpertDashboardService(viewsService, router, profileService, store);
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
    service.getExpertProfileData('fake expert').subscribe(value => {
      expect(value).toEqual(Mocks.expertProfileViewResult);
    });
  }));

  it('should make return resolved and filtered data', fakeAsync(() => {
    // prepare data
    const expertView = cold('-a|', { a: Mocks.expertProfileView1 });

    // mock functions
    (viewsService.getWebExpertProfileRoute as jest.Mock).mockReturnValue(expertView);

    // expect result
    service.getExpertProfileData('fake Expert').subscribe(value => {
      expect(value).toEqual(Mocks.expertProfileViewResult1);
    });
  }));

  /**
   * this tests implementation I don't know how to test it.
   */
  describe('addConsultation', () => {
    it('should not dispatch any action when modal returned string', fakeAsync(() => {
      const spy = spyOn(store, 'dispatch');
      const modalResult: Promise<any> = Promise.resolve('consultation removed');
      const getProfileWithDocuments = of({} as any);
      service.addConsultation(modalResult, getProfileWithDocuments);
      tick();
      expect(spy).not.toHaveBeenCalled();
    }));
    it('should not dispatch any action when modal returned undefined', fakeAsync(() => {
      const spy = spyOn(store, 'dispatch');
      const modalResult = Promise.resolve();
      const getProfileWithDocuments = of({} as any);
      service.addConsultation(modalResult, getProfileWithDocuments);
      tick();
      expect(spy).not.toHaveBeenCalled();
    }));
    it('should dispatch any action when modal returned new service', fakeAsync(() => {
      const getService: GetService = {
        createdAt: new Date(0),
        description: 'fake description',
        id: 'fake id',
        isFreelance: false,
        isSuspended: false,
        language: 'fake language',
        name: 'fake name',
        ownerId: 'fake ownerId',
        price: {
          currency: 'fake currency',
          value: 0,
        },
      };

      const expectedPayload: EmploymentWithService = {
        commentCounter: 0,
        createdAt: new Date(0),
        employeeId: '123',
        id: '',
        ratingCounter: 0,
        usageCounter: 0,
        vatRateType: 'fake vat' as EmploymentWithService.VatRateTypeEnum,
        serviceDetails: {
          ...getService,
          ownerProfile: {} as any,
          vatRateType: 'fake vat' as EmploymentWithService.VatRateTypeEnum,
        },
      };
      const spy = spyOn(store, 'dispatch');
      const modalResult = Promise.resolve(new ConsultationDetailActions.AddConsultationAction(getService));
      const getProfileWithDocuments = of({ profile: {} } as any);
      service.addConsultation(modalResult, getProfileWithDocuments);
      tick();
      expect(spy).toHaveBeenCalledWith(new ExpertDashboardActions.AddConsultationAction(expectedPayload));
    }));
  });
});
