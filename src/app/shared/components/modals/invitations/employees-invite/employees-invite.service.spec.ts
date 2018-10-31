import { EmployeesInviteService } from '@platform/shared/components/modals/invitations/employees-invite/employees-invite.service';
import { EmploymentService, InvitationService, ServiceService } from '@anymind-ng/api';
import { cold } from 'jasmine-marbles';
import { Deceiver } from 'deceiver-core';
import { PhoneNumberUnifyService } from '@platform/shared/services/phone-number-unify/phone-number-unify.service';
import { CommonSettingsService } from 'angularjs/common/services/common-settings/common-settings.service';
import * as angular from 'angular';

describe('EmployeesInviteService', () => {
  let employeesInviteService: EmployeesInviteService;

  const employmentService: EmploymentService = Deceiver(EmploymentService);
  const serviceService: ServiceService = Deceiver(ServiceService);
  const invitationService: InvitationService = Deceiver(InvitationService);
  const phoneNumberUnifyService: PhoneNumberUnifyService = Deceiver(PhoneNumberUnifyService);
  const commonSettingsService: CommonSettingsService = new CommonSettingsService();

  beforeEach(() => {
    employeesInviteService = new EmployeesInviteService(
      employmentService,
      serviceService,
      phoneNumberUnifyService,
      invitationService,
      commonSettingsService,
    );
  });

  beforeEach(
    angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('CommonSettingsService', CommonSettingsService);
    }),
  );

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
        },
      ],
      pendingInvitations: {
        invitations: ['555999000', ''],
        employeeInvitations: [{ email: undefined, msisdn: undefined, employeeId: 'employeeIdTest' }],
      },
    };

    const expected$ = cold('-(a|)', { a: result });
    employmentService.getEmployeesRoute = jasmine
      .createSpy('getEmployeesRoute')
      .and.returnValue(cold('-(a|)', { a: expertProfileWithEmployments }));
    serviceService.postServiceInvitationsRoute = jasmine
      .createSpy('postServiceInvitationsRoute')
      .and.returnValue(cold('-(a|)', { a: getServiceWithInvitations }));
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
    employmentService.getEmployeesRoute = jasmine
      .createSpy('getEmployeesRoute')
      .and.returnValue(cold('-(a|)', { a: expertProfileWithEmployments }));
    serviceService.postServiceInvitationsRoute = jasmine
      .createSpy('postServiceInvitationsRoute')
      .and.returnValue(cold('-(a|)', { a: getServiceWithInvitations }));
    expect(employeesInviteService.mapEmployeeList(serviceId)).toBeObservable(expected$);
  });
});
