import {
  EmploymentService,
  InvitationService,
  ProfileService,
  ServiceService,
  PaymentsService,
  FinancesService,
} from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { TestBed } from '@angular/core/testing';
import { provideMockFactoryLogger } from 'testing/testing';
import { cold } from 'jasmine-marbles';
import { CompanyConsultationDetailsViewService } from './company-consultation-details.view.service';

describe('CompanyConsultationDetailsViewService', () => {
  let service: CompanyConsultationDetailsViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompanyConsultationDetailsViewService,
        {
          provide: ServiceService,
          useValue: Deceiver(ServiceService),
        },
        {
          provide: EmploymentService,
          useValue: Deceiver(EmploymentService),
        },
        {
          provide: InvitationService,
          useValue: Deceiver(InvitationService),
        },
        {
          provide: ProfileService,
          useValue: Deceiver(ProfileService),
        },
        {
          provide: PaymentsService,
          useValue: Deceiver(PaymentsService),
        },
        {
          provide: FinancesService,
          useValue: Deceiver(FinancesService),
        },
        provideMockFactoryLogger(),
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(CompanyConsultationDetailsViewService);
  });

  it('should get consultation details', () => {
    const serviceService = TestBed.get(ServiceService);
    const paymentsService: PaymentsService = TestBed.get(PaymentsService);
    const financesService: FinancesService = TestBed.get(FinancesService);

    const getServiceTags = {
      serviceId: '1234',
      tags: [{ name: 'tag' }, { name: 'tag2' }],
    };

    const moneyDto = {
      amount: 1,
      currency: 'PLN',
    };

    const getProfile = {
      id: '1234',
      isActive: false,
    };

    const expertProfile = {
      id: '1234',
      name: 'name',
      avatar: 'avatar',
      description: 'description',
    };

    const employmentWithExpertProfile = {
      id: '1234',
      serviceId: '1234',
      employeeProfile: expertProfile,
      usageCounter: 1,
      commentCounter: 1,
      ratingCounter: 1,
      createdAt: Date,
    };

    const getServiceWithEmployees = {
      serviceDetails: {
        id: '1234',
        ownerProfile: getProfile,
        name: 'Name',
        description: 'Description',
        netPrice: moneyDto,
        grossPrice: moneyDto,
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date(),
      },
      employeesDetails: [employmentWithExpertProfile],
    };

    const result = {
      tagsList: ['tag', 'tag2'],
      serviceDetails: getServiceWithEmployees,
      employeesList: [
        {
          usageCounter: employmentWithExpertProfile.usageCounter,
          ratingCounter: employmentWithExpertProfile.ratingCounter,
          rating: undefined,
          id: employmentWithExpertProfile.id,
          name: employmentWithExpertProfile.employeeProfile.name,
          avatar: employmentWithExpertProfile.employeeProfile.avatar,
          employeeId: employmentWithExpertProfile.employeeProfile.id,
        },
      ],
      defaultPaymentMethod: {},
      creditCards: [],
      getCommissions: {
        profileAmount: moneyDto,
      },
    };

    const expected = cold('-(a|)', { a: result });

    const postServicesTagsRoute = cold('-(a|)', { a: [getServiceTags] });
    const postServiceWithEmployeesRoute = cold('-(a|)', { a: [getServiceWithEmployees] });
    const getDefaultPaymentMethodRoute = cold('-#');

    serviceService.postServicesTagsRoute = jest.fn(() => postServicesTagsRoute);
    paymentsService.getDefaultPaymentMethodRoute = jest.fn(() => getDefaultPaymentMethodRoute);
    serviceService.postServiceWithEmployeesRoute = jest.fn(() => postServiceWithEmployeesRoute);

    financesService.postCommissionsRoute = jest.fn(() => cold('(a|)', { a: result.getCommissions }));
    expect(service.getConsultationDetails('1234')).toBeObservable(expected);
  });

  it('should get error when get tags list', () => {
    const serviceService = TestBed.get(ServiceService);
    const paymentsService: PaymentsService = TestBed.get(PaymentsService);

    const result = undefined;
    const error = 'error';

    const expected = cold('-|', { a: result });
    const postServicesTagsRoute = cold('-#', {}, error);
    const postServiceWithEmployeesRoute = cold('-(a|)', { a: [] });

    serviceService.postServicesTagsRoute = jest.fn(() => postServicesTagsRoute);
    serviceService.postServiceWithEmployeesRoute = jest.fn(() => postServiceWithEmployeesRoute);
    paymentsService.getDefaultPaymentMethodRoute = jest.fn(() => cold('-#'));

    expect(service.getConsultationDetails('1234')).toBeObservable(expected);
  });
});
