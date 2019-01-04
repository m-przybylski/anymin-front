// tslint:disable:max-file-line-count
import {
  EmployeeInvitationTypeEnum,
  EmployeesInviteService,
} from '@platform/shared/components/modals/invitations/employees-invite/employees-invite.service';
import { EmploymentService, GetSessionWithAccount, InvitationService, ServiceService } from '@anymind-ng/api';
import { cold } from 'jasmine-marbles';
import { Deceiver } from 'deceiver-core';
import { PhoneNumberUnifyService } from '@platform/shared/services/phone-number-unify/phone-number-unify.service';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { TestBed } from '@angular/core/testing';
import { importStore, dispatchLoggedUser } from 'testing/testing';
import { isValidNumber } from 'libphonenumber-js';

describe('EmployeesInviteService', () => {
  let employeesInviteService: EmployeesInviteService;
  let store: Store<fromCore.IState>;
  const mockSession: GetSessionWithAccount = {
    account: {
      id: 'id',
      msisdn: '+48555555555',
      email: 'szybkiRoman123@gmail.com',
      registeredAt: new Date(),
      isBlocked: false,
      hasPassword: true,
      isAnonymous: false,
      details: {
        clientId: 'id',
      },
      currency: 'PLN',
      countryISO: 'pl',
    },
    session: {
      accountId: 'id',
      apiKey: 'apiKey',
      ipAddress: '0.0.0.0',
      isExpired: false,
      lastActivityAt: new Date(),
    },
    isCompany: false,
    isExpert: true,
  };

  const employmentService: EmploymentService = Deceiver(EmploymentService);
  const serviceService: ServiceService = Deceiver(ServiceService);
  const invitationService: InvitationService = Deceiver(InvitationService);
  const phoneNumberUnifyService: PhoneNumberUnifyService = Deceiver(PhoneNumberUnifyService, {
    unifyPhoneNumber: jest.fn(),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
    });
    store = TestBed.get(Store);
    dispatchLoggedUser(store, mockSession);

    employeesInviteService = new EmployeesInviteService(
      employmentService,
      serviceService,
      phoneNumberUnifyService,
      invitationService,
      store,
    );
    employeesInviteService.isValidNumber = jest.fn();
  });

  it('should be created', () => {
    expect(employeesInviteService).toBeTruthy();
  });

  it('should map employee list without invited employee', () => {
    const serviceId = '7dd289d1-4e99-46db-bfd4-a0b56ad1d3cb';

    const expertProfileWithEmployments: ReadonlyArray<any> = [
      {
        expertProfile: {
          id: '7e859d32-aa37-4293-9449-432ad7b0223b',
          name: 'Experto 05',
          avatar: 'd6dfef1381744186a89db1a8e336436f',
          description: 'Concatis asdadsConcatis asdadsConcatis asdadsConcatisncatis asdads',
        },
        employments: [
          {
            id: 'b116e485-dca6-4449-a473-35284e0244ff',
            serviceId: 'test',
            serviceOwnerId: '7e859d32-aa37-4293-9449-432ad7b0223b',
            employeeId: '7e859d32-aa37-4293-9449-432ad7b0223b',
            usageCounter: 16,
            commentCounter: 11,
            ratingCounter: 12,
            rating: 83,
            createdAt: new Date(),
          },
        ],
      },
    ];

    const getServiceWithInvitations: ReadonlyArray<any> = [
      {
        service: {
          id: serviceId,
          ownerId: 'string',
          name: 'Consultation name',
          description: 'string',
          price: {
            amount: 1,
            currency: 'string',
          },
          language: 'string',
          isSuspended: true,
          isFreelance: true,
          createdAt: new Date(),
        },
        invitations: [
          {
            id: 'id',
            serviceId,
            serviceName: 'string',
            serviceOwnerId: 'string',
            msisdn: '555999000',
            status: 'NEW',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'id',
            serviceId,
            serviceName: 'string',
            serviceOwnerId: 'string',
            employeeId: 'employeeIdTest',
            status: 'NEW',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ];

    const result = {
      employeeList: [
        {
          name: 'Experto 05',
          avatar: 'd6dfef1381744186a89db1a8e336436f',
          employeeId: '7e859d32-aa37-4293-9449-432ad7b0223b',
          serviceId: 'test',
          id: '7e859d32-aa37-4293-9449-432ad7b0223b',
        },
      ],
      pendingInvitations: {
        invitations: ['555999000', ''],
        employeeInvitations: [{ email: undefined, msisdn: undefined, employeeId: 'employeeIdTest' }],
      },
    };

    const expected$ = cold('-(a|)', { a: result });
    employmentService.getEmployeesRoute = jest.fn(() => cold('-(a|)', { a: expertProfileWithEmployments }));
    serviceService.postServiceInvitationsRoute = jest.fn(() => cold('-(a|)', { a: getServiceWithInvitations }));
    expect(employeesInviteService.mapEmployeeList(serviceId)).toBeObservable(expected$);
  });

  it('should map employee list with already invited employee', () => {
    const serviceId = '7dd289d1-4e99-46db-bfd4-a0b56ad1d3cb';

    const expertProfileWithEmployments: ReadonlyArray<any> = [
      {
        expertProfile: {
          id: '7e859d32-aa37-4293-9449-432ad7b0223b',
          name: 'Experto 05',
          avatar: 'd6dfef1381744186a89db1a8e336436f',
          description: 'Concatis asdadsConcatis asdadsConcatis asdadsConcatisncatis asdads',
        },
        employments: [
          {
            id: 'b116e485-dca6-4449-a473-35284e0244ff',
            serviceId: 'test',
            serviceOwnerId: '7e859d32-aa37-4293-9449-432ad7b0223b',
            employeeId: '7e859d32-aa37-4293-9449-432ad7b0223b',
            usageCounter: 16,
            commentCounter: 11,
            ratingCounter: 12,
            rating: 83,
            createdAt: new Date(),
          },
          {
            id: 'b116e485-dca6-4449-a473-35284e0244ff',
            serviceId,
            serviceOwnerId: '7e859d32-aa37-4293-9449-432ad7b0223b',
            employeeId: '7e859d32-aa37-4293-9449-432ad7b0223b',
            usageCounter: 16,
            commentCounter: 11,
            ratingCounter: 12,
            rating: 83,
            createdAt: new Date(),
          },
        ],
      },
    ];

    const getServiceWithInvitations: ReadonlyArray<any> = [
      {
        service: {
          id: serviceId,
          ownerId: 'string',
          name: 'Consultation name',
          description: 'string',
          price: {
            amount: 1,
            currency: 'string',
          },
          language: 'string',
          isSuspended: true,
          isFreelance: true,
          createdAt: new Date(),
        },
        invitations: [
          {
            id: 'id',
            serviceId,
            serviceName: 'string',
            serviceOwnerId: 'string',
            msisdn: '555999000',
            status: 'NEW',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'id',
            serviceId,
            serviceName: 'string',
            serviceOwnerId: 'string',
            employeeId: 'employeeIdTest',
            status: 'NEW',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ];

    const result = {
      employeeList: [],
      pendingInvitations: {
        invitations: ['555999000', ''],
        employeeInvitations: [{ email: undefined, msisdn: undefined, employeeId: 'employeeIdTest' }],
      },
    };

    const expected$ = cold('-(a|)', { a: result });
    employmentService.getEmployeesRoute = jest.fn(() => cold('-(a|)', { a: expertProfileWithEmployments }));
    serviceService.postServiceInvitationsRoute = jest.fn(() => cold('-(a|)', { a: getServiceWithInvitations }));
    expect(employeesInviteService.mapEmployeeList(serviceId)).toBeObservable(expected$);
  });

  it('should return MAX_LENGTH_REACHED when you reach max invitations limit', () => {
    const maxPossibleInvitations = 100;
    const mockInvitations = new Array(maxPossibleInvitations);
    employeesInviteService.setInvitedEmployeeList(mockInvitations);
    expect(employeesInviteService.checkInvitationType('someInvitationEmail@gmail.com', false)).toBe(
      EmployeeInvitationTypeEnum.MAX_LENGTH_REACHED,
    );
  });

  it('should return INVALID status when provided invitation email is incorrect', () => {
    expect(employeesInviteService.checkInvitationType('someIncorrectInvitationEmail@', false)).toBe(
      EmployeeInvitationTypeEnum.INVALID,
    );
  });

  it('should return IS_EMAIL status when provided invitation email is correct', () => {
    expect(employeesInviteService.checkInvitationType('someInvitationEmail@gmail.com', false)).toBe(
      EmployeeInvitationTypeEnum.IS_EMAIL,
    );
  });

  it(
    'should return OWNER_USER status when provided invitation email is correct and' +
      'is the same as user email, service is freelance type',
    () => {
      expect(employeesInviteService.checkInvitationType('szybkiRoman123@gmail.com', true)).toBe(
        EmployeeInvitationTypeEnum.OWNER_USER,
      );
    },
  );

  it('should return IS_MSISDN status when provided invitation msisdn is correct', () => {
    phoneNumberUnifyService.unifyPhoneNumber = jest.fn();
    employeesInviteService.isValidNumber = jest.fn(() => true);
    expect(employeesInviteService.checkInvitationType('+48555555555', false)).toBe(
      EmployeeInvitationTypeEnum.IS_MSISDN,
    );
  });

  it(
    'should return OWNER_USER status when provided invitation msisdn is correct and' +
      'is the same as user msisdn, service is freelance type',
    () => {
      phoneNumberUnifyService.unifyPhoneNumber = jest.fn(_ => _);
      employeesInviteService.isValidNumber = jest.fn(() => true);
      expect(employeesInviteService.checkInvitationType('+48555555555', true)).toBe(
        EmployeeInvitationTypeEnum.OWNER_USER,
      );
    },
  );
});
