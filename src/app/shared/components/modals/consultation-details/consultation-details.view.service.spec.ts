// tslint:disable:readonly-array
// tslint:disable:max-file-line-count

import { ConsultationDetailsViewService, IConsultationDetails } from './consultation-details.view.service';
import { Deceiver } from 'deceiver-core';
import {
  EmploymentService,
  ProfileService,
  ServiceService,
  ViewsService,
  PaymentsService,
  FinancesService,
  GetServiceWithEmployees,
  GetComment,
  GetProfileWithDocuments,
  ExpertProfileView,
  GetServiceTags,
} from '@anymind-ng/api';
import { AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { ExpertAvailabilityService } from '@platform/features/dashboard/components/expert-availability/expert-availablity.service';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthActions } from '@platform/core/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from '@platform/shared/components/modals/confirmation/confirmation.service';

describe('ConsultationDetailsViewService', () => {
  let consultationDetailsViewService: ConsultationDetailsViewService;
  let store: Store<fromCore.IState>;

  const serviceService: ServiceService = Deceiver(ServiceService);
  const profileService: ProfileService = Deceiver(ProfileService);
  const viewsService: ViewsService = Deceiver(ViewsService);
  const employmentService: EmploymentService = Deceiver(EmploymentService);
  const paymentsService: PaymentsService = Deceiver(PaymentsService);
  const financesService: FinancesService = Deceiver(FinancesService);
  const alertService: AlertService = Deceiver(AlertService);
  const expertAvailabilityService: ExpertAvailabilityService = Deceiver(ExpertAvailabilityService);
  const confirmationService: ConfirmationService = Deceiver(ConfirmationService);
  const loggerFactory: LoggerFactory = Deceiver(LoggerFactory, {
    createLoggerService: jasmine.createSpy('createLoggerService').and.returnValue(Deceiver(LoggerService)),
  });
  const modalService: NgbModal = Deceiver(NgbModal);
  const router: Router = Deceiver(Router);
  const route: ActivatedRoute = Deceiver(ActivatedRoute);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          core: combineReducers(fromCore.reducers),
        }),
      ],
    });
    store = TestBed.get(Store);
    consultationDetailsViewService = new ConsultationDetailsViewService(
      serviceService,
      profileService,
      viewsService,
      employmentService,
      paymentsService,
      financesService,
      alertService,
      expertAvailabilityService,
      store,
      confirmationService,
      // stub Injector
      undefined as any,
      modalService,
      router,
      route,
      loggerFactory,
    );
  });

  it('should be created', () => {
    expect(consultationDetailsViewService).toBeTruthy();
  });

  describe('getServiceDetails', () => {
    it('should create proper object from backend', () => {
      // define consts
      const serviceId = 'serviceId1';
      const employeeId = 'qqqq';
      const getServiceWithEmployees: GetServiceWithEmployees[] = [
        {
          employeesDetails: [
            {
              id: 'employmentId1',
              serviceId: 'serviceId1',
              employeeProfile: {
                id: '123444',
              },
            },
            {
              id: 'employeeId2',
              serviceId: 'serviceId2',
              employeeProfile: {
                id: '123445',
              },
            },
            {
              id: 'employeeId3',
              serviceId: 'serviceId3',
              employeeProfile: {
                id: '123446',
              },
            },
          ] as any,
          serviceDetails: {
            id: serviceId,
            createdAt: new Date(),
            description: 'jajaja',
            grossPrice: {
              amount: 123,
              currency: 'PLN',
            },
            isFreelance: false,
            isSuspended: false,
            language: 'PL',
            name: 'tytytyt',
            netPrice: {
              amount: 100,
              currency: 'PLN',
            },
            ownerProfile: {
              id: employeeId,
              isActive: false,
            },
          },
        },
      ];
      const getComments: GetComment[] = [
        {
          commentId: '123',
          content: 'arturek jest super',
          expertId: '1234',
          sueId: 'qqwer',
          callDurationInSeconds: 134,
          isRecommended: true,
          clientDetails: {
            avatar: '12345555',
            clientId: '121qweqq',
            nickname: 'przekozak',
          },
          createdAt: new Date(),
        },
      ];
      const getProfileWithDocuments: GetProfileWithDocuments = {
        expertDocuments: [],
        profile: {
          id: 'qwerr',
          isActive: true,
          expertDetails: {
            avatar: '123444',
            description: 'jujuju',
            links: [],
            name: 'asdfff',
          },
        },
        organizationDocuments: [],
      };
      const expertProfileView: ExpertProfileView = {
        employments: [],
        expertProfile: {
          avatar: '123444',
          description: 'jujuju',
          name: 'asdfff',
          documents: [],
          id: '1das3444',
        },
        isFavourite: false,
      };

      const result: IConsultationDetails = {
        expertDetails: getProfileWithDocuments,
        expertProfileViewDetails: expertProfileView,
        getServiceWithEmployees: getServiceWithEmployees[0],
        expertIds: ['123444', '123445', '123446'],
        payment: {},
        balance: {
          amount: 0,
          currency: '',
        },
        employmentId: 'employmentId1',
        getComments,
      } as any;
      serviceService.postServiceWithEmployeesRoute = jasmine
        .createSpy('postServiceWithEmployeesRoute')
        .and.returnValue(cold('a|', { a: getServiceWithEmployees }));

      employmentService.getEmploymentCommentsRoute = jasmine
        .createSpy('getEmploymentCommentsRoute')
        .and.returnValue(cold('-(a|)', { a: getComments }));
      profileService.getProfileRoute = jasmine
        .createSpy('getProfileRoute')
        .and.returnValue(cold('--(a|)', { a: getProfileWithDocuments }));
      viewsService.getWebExpertProfileRoute = jasmine
        .createSpy('getWebExpertProfileRoute')
        .and.returnValue(cold('(a|)', { a: expertProfileView }));
      const expected = cold('--(a|)', { a: result });

      paymentsService.getDefaultPaymentMethodRoute = jasmine
        .createSpy('getDefaultPaymentMethodRoute')
        .and.returnValue(cold('#', {}, 'oups'));

      financesService.getClientBalanceRoute = jasmine.createSpy('getClientBalanceRoute').and.returnValue(cold('#'));

      expect(consultationDetailsViewService.getServiceDetails(serviceId, employeeId)).toBeObservable(expected);
    });
  });

  describe('getServicesTagList', () => {
    it('should return proper value', () => {
      const serviceId = '123444';
      const tagsFromServer: GetServiceTags[] = [
        {
          serviceId,
          tags: [
            {
              name: 'ohohoh',
              id: '12344',
              status: 'NEW',
            },
            {
              name: 'ahahah',
              id: '12344',
              status: 'NEW',
            },
          ],
        },
      ];
      const expected$ = cold('--a|', { a: ['ohohoh', 'ahahah'] });
      serviceService.postServicesTagsRoute = jasmine
        .createSpy('postServicesTagsRoute')
        .and.returnValue(cold('--a|', { a: tagsFromServer }));
      expect(consultationDetailsViewService.getServicesTagList(serviceId)).toBeObservable(expected$);
    });
    it('should return empty array if no serviceid found in response ', () => {
      const serviceId = '123444';
      const tagsFromServer: GetServiceTags[] = [
        {
          serviceId: '12',
          tags: [
            {
              name: 'ohohoh',
              id: '12344',
              status: 'NEW',
            },
            {
              name: 'ahahah',
              id: '12344',
              status: 'NEW',
            },
          ],
        },
      ];
      const expected$ = cold('--a|', { a: [] });
      serviceService.postServicesTagsRoute = jasmine
        .createSpy('postServicesTagsRoute')
        .and.returnValue(cold('--a|', { a: tagsFromServer }));
      expect(consultationDetailsViewService.getServicesTagList(serviceId)).toBeObservable(expected$);
    });
  });

  describe('addTemporaryComment', () => {
    const dummyDate = new Date();
    it('should return new array', () => {
      const getComment: GetComment = {
        commentId: '1234',
        content: 'omment',
        expertId: '123132',
        sueId: '111',
        callDurationInSeconds: 156,
        isRecommended: false,
        clientDetails: {
          avatar: 'a13ee',
          clientId: '333',
          nickname: 'osom',
        },
        answer: {
          content: 'asdf',
          createdAt: dummyDate,
        },
        createdAt: dummyDate,
      };
      const getComentList: GetComment[] = [
        {
          commentId: '123',
          content: 'omment',
          expertId: '123132',
          sueId: '111',
          callDurationInSeconds: 156,
          isRecommended: false,
          clientDetails: {
            avatar: 'a13ee',
            clientId: '333',
            nickname: 'osom',
          },
          createdAt: dummyDate,
        },
        {
          commentId: '1234',
          content: 'omment',
          expertId: '123132',
          sueId: '111',
          callDurationInSeconds: 156,
          isRecommended: false,
          clientDetails: {
            avatar: 'a13ee',
            clientId: '333',
            nickname: 'osom',
          },
          createdAt: dummyDate,
        },
        {
          commentId: '123',
          content: 'omment',
          expertId: '123132',
          sueId: '111',
          callDurationInSeconds: 156,
          isRecommended: false,
          clientDetails: {
            avatar: 'a13ee',
            clientId: '333',
            nickname: 'osom',
          },
          createdAt: dummyDate,
        },
      ];
      const getComentListResult: GetComment[] = [
        {
          commentId: '123',
          content: 'omment',
          expertId: '123132',
          sueId: '111',
          callDurationInSeconds: 156,
          isRecommended: false,
          clientDetails: {
            avatar: 'a13ee',
            clientId: '333',
            nickname: 'osom',
          },
          createdAt: dummyDate,
        },
        {
          commentId: '1234',
          content: 'omment',
          expertId: '123132',
          sueId: '111',
          callDurationInSeconds: 156,
          isRecommended: false,
          clientDetails: {
            avatar: 'a13ee',
            clientId: '333',
            nickname: 'osom',
          },
          answer: {
            content: 'asdf',
            createdAt: dummyDate,
          },
          createdAt: dummyDate,
        },
        {
          commentId: '123',
          content: 'omment',
          expertId: '123132',
          sueId: '111',
          callDurationInSeconds: 156,
          isRecommended: false,
          clientDetails: {
            avatar: 'a13ee',
            clientId: '333',
            nickname: 'osom',
          },
          createdAt: dummyDate,
        },
      ];
      const a = consultationDetailsViewService.addTemporaryComment(getComment, getComentList);

      expect(a).not.toBe(getComentList);
      expect(a).toEqual(getComentListResult);
    });

    it('should return the same array if comment not found', () => {
      const getComment: GetComment = {
        commentId: '1234',
        content: 'omment',
        expertId: '123132',
        sueId: '111',
        callDurationInSeconds: 156,
        isRecommended: false,
        clientDetails: {
          avatar: 'a13ee',
          clientId: '333',
          nickname: 'osom',
        },
        answer: {
          content: 'asdf',
          createdAt: dummyDate,
        },
        createdAt: dummyDate,
      };
      const getComentList: GetComment[] = [
        {
          commentId: '123',
          content: 'omment',
          expertId: '123132',
          sueId: '111',
          callDurationInSeconds: 156,
          isRecommended: false,
          clientDetails: {
            avatar: 'a13ee',
            clientId: '333',
            nickname: 'osom',
          },
          createdAt: dummyDate,
        },
        {
          commentId: '123',
          content: 'omment',
          expertId: '123132',
          sueId: '111',
          callDurationInSeconds: 156,
          isRecommended: false,
          clientDetails: {
            avatar: 'a13ee',
            clientId: '333',
            nickname: 'osom',
          },
          createdAt: dummyDate,
        },
        {
          commentId: '123',
          content: 'omment',
          expertId: '123132',
          sueId: '111',
          callDurationInSeconds: 156,
          isRecommended: false,
          clientDetails: {
            avatar: 'a13ee',
            clientId: '333',
            nickname: 'osom',
          },
          createdAt: dummyDate,
        },
      ];
      const a = consultationDetailsViewService.addTemporaryComment(getComment, getComentList);

      expect(a).toBe(getComentList);
      expect(a).toEqual(getComentList);
    });
  });

  describe('makeCall', () => {
    const modal = Deceiver(NgbActiveModal, { close: jasmine.createSpy('call') });
    it('should redirect to login when user is not logged in', fakeAsync(() => {
      // make sure user is not logged
      store.dispatch(new AuthActions.LogoutSuccessAction());
      // spy on dispatch action
      const spy = spyOn(store, 'dispatch');
      consultationDetailsViewService.makeCall('', modal);
      expect(modal.close).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(new AuthActions.LoginRedirectAction());
    }));

    it('should redirect to login when user is not logged in', fakeAsync(() => {
      // make sure user is not logged
      const session = {} as any;
      store.dispatch(new AuthActions.LoginSuccessAction(session));
      // spy on dispatch action
      const spy = spyOn(store, 'dispatch');
      consultationDetailsViewService.makeCall('', modal);
      expect(modal.close).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    }));
  });

  describe('editConsultation', () => {
    it('should open create/edit consultation modal then close and reload page', fakeAsync(() => {
      const mockServiceId = 'someId';
      const modal = Deceiver(NgbActiveModal, { close: jasmine.createSpy('open') });
      const mockEmploymentId = 'someEmploymentId';
      const mockConsultationPayload = {} as any;
      route.snapshot = {url: ['']} as any;
      modalService.open = jasmine.createSpy('open');
      (modalService.open as jasmine.Spy).and.returnValue({result: Promise.resolve({})});
      router.navigate = jasmine.createSpy('navigate').and.returnValue(Promise.resolve());
      consultationDetailsViewService.editConsultation(mockServiceId, modal, mockEmploymentId, mockConsultationPayload);
      flush();
      expect(modalService.open).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalled();
      expect(modal.close).toHaveBeenCalledWith(mockServiceId);
    }));

    it('should open create/edit consultation modal then close without reload page', fakeAsync(() => {
      const mockServiceId = 'someId';
      const modal = Deceiver(NgbActiveModal, { close: jasmine.createSpy('open') });
      const mockEmploymentId = 'someEmploymentId';
      const mockConsultationPayload = {} as any;
      route.snapshot = {url: ['']} as any;
      modalService.open = jasmine.createSpy('open');
      (modalService.open as jasmine.Spy).and.returnValue({result: Promise.reject({})});
      router.navigate = jasmine.createSpy('navigate').and.stub();
      consultationDetailsViewService.editConsultation(mockServiceId, modal, mockEmploymentId, mockConsultationPayload);
      flush();
      expect(modalService.open).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(modal.close).toHaveBeenCalledWith(mockServiceId);
    }));
  });

  describe('deleteConsultation', () => {
    it('should not close modal when user did not confirm', fakeAsync(() => {
      const modal = Deceiver(NgbActiveModal, { close: jasmine.createSpy('close') });
      confirmationService.confirm = jasmine.createSpy('confirm').and.returnValue(cold('--a|', { a: false }));
      consultationDetailsViewService.deleteConsultation('asdf', modal);
      getTestScheduler().flush();
      expect(modal.close).not.toHaveBeenCalled();
    }));
    it('should close modal when user did confirm', () => {
      const modal = Deceiver(NgbActiveModal, { close: jasmine.createSpy('close') });
      confirmationService.confirm = jasmine.createSpy('confirm').and.returnValue(cold('--a|', { a: true }));
      serviceService.deleteServiceRoute = jasmine
        .createSpy('deleteServiceRoute')
        .and.returnValue(cold('-a|', { a: 'okey' }));
      alertService.pushSuccessAlert = jasmine.createSpy('pushSuccessAlert');
      consultationDetailsViewService.deleteConsultation('asdf', modal);
      getTestScheduler().flush();
      expect(serviceService.deleteServiceRoute).toHaveBeenCalledWith('asdf');
      expect(modal.close).toHaveBeenCalledWith('asdf');
    });
    it('should not close modal when user confirmed but there was error on backend', () => {
      const modal = Deceiver(NgbActiveModal, { close: jasmine.createSpy('close') });
      confirmationService.confirm = jasmine.createSpy('confirm').and.returnValue(cold('--a|', { a: true }));
      serviceService.deleteServiceRoute = jasmine
        .createSpy('deleteServiceRoute')
        .and.returnValue(cold('-#', {}, 'oups'));
      alertService.pushSuccessAlert = jasmine.createSpy('pushSuccessAlert');
      alertService.pushDangerAlert = jasmine.createSpy('pushDangerAlert');
      consultationDetailsViewService.deleteConsultation('asdf', modal);
      getTestScheduler().flush();
      expect(serviceService.deleteServiceRoute).toHaveBeenCalledWith('asdf');
      expect(modal.close).not.toHaveBeenCalled();
    });
  });
  describe('leaveConsultation', () => {
    it('should not close modal when user did not confirm', fakeAsync(() => {
      const modal = Deceiver(NgbActiveModal, { close: jasmine.createSpy('close') });
      confirmationService.confirm = jasmine.createSpy('confirm').and.returnValue(cold('--a|', { a: false }));
      consultationDetailsViewService.leaveConsultation('asdf', modal, 'aasd');
      getTestScheduler().flush();
      expect(modal.close).not.toHaveBeenCalled();
    }));
    it('should close modal when user did confirm', () => {
      const modal = Deceiver(NgbActiveModal, { close: jasmine.createSpy('close') });
      confirmationService.confirm = jasmine.createSpy('confirm').and.returnValue(cold('--a|', { a: true }));
      employmentService.deleteEmploymentRoute = jasmine
        .createSpy('deleteEmploymentRoute')
        .and.returnValue(cold('-a|', { a: 'okey' }));
      alertService.pushSuccessAlert = jasmine.createSpy('pushSuccessAlert');
      consultationDetailsViewService.leaveConsultation('asdf', modal, 'aaa');
      getTestScheduler().flush();
      expect(employmentService.deleteEmploymentRoute).toHaveBeenCalledWith('aaa');
      expect(modal.close).toHaveBeenCalledWith('asdf');
    });
    it('should not close modal when user confirmed but there was error on backend', () => {
      const modal = Deceiver(NgbActiveModal, { close: jasmine.createSpy('close') });
      confirmationService.confirm = jasmine.createSpy('confirm').and.returnValue(cold('--a|', { a: true }));
      employmentService.deleteEmploymentRoute = jasmine
        .createSpy('deleteEmploymentRoute')
        .and.returnValue(cold('-#', {}, 'oups'));
      alertService.pushSuccessAlert = jasmine.createSpy('pushSuccessAlert');
      alertService.pushDangerAlert = jasmine.createSpy('pushDangerAlert');
      consultationDetailsViewService.leaveConsultation('asdf', modal, 'aaa');
      getTestScheduler().flush();
      expect(employmentService.deleteEmploymentRoute).toHaveBeenCalledWith('aaa');
      expect(modal.close).not.toHaveBeenCalled();
    });
  });
});
