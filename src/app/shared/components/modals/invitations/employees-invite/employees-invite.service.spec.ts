import { TestBed, inject } from '@angular/core/testing';

import { EmployeesInviteService } from './employees-invite.service';
import { EmploymentService, InvitationService, ServiceService } from '@anymind-ng/api';
import createSpyObj = jasmine.createSpyObj;
import { CommonSettingsService } from 'angularjs/common/services/common-settings/common-settings.service';
import { PhoneNumberUnifyService } from '../../../../services/phone-number-unify/phone-number-unify.service';

describe('EmployeesInviteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeesInviteService,
        CommonSettingsService,
        { provide: EmploymentService, useValue: createSpyObj('EmploymentService', ['getEmployeesRoute']) },
        {
          provide: ServiceService,
          useValue: createSpyObj('ServiceService', ['postServiceInvitationsRoute', 'getServiceRoute']),
        },
        { provide: InvitationService, useValue: createSpyObj('InvitationService', ['postInvitationRoute']) },
        { provide: PhoneNumberUnifyService, useValue: createSpyObj('PhoneNumberUnifyService', ['unifyPhoneNumber']) },
      ],
    });
  });

  it('should be created', inject([EmployeesInviteService], (service: EmployeesInviteService) => {
    expect(service).toBeTruthy();
  }));

  it('should get employee list', () => {
    const service = TestBed.get(EmployeesInviteService);
    const employmentService = TestBed.get(EmploymentService);
    service.getEmployeeList();
    expect(employmentService.getEmployeesRoute).toHaveBeenCalled();
  });

  it('should get invitations of consultation', () => {
    const service = TestBed.get(EmployeesInviteService);
    const serviceService = TestBed.get(ServiceService);
    const serviceId = 'a8144dee-5266-4873-ae23-ec6c567521cf';

    service.getInvitations(serviceId);
    expect(serviceService.postServiceInvitationsRoute).toHaveBeenCalledWith({ serviceIds: [serviceId] });
  });

  it('should get consulation details', () => {
    const service = TestBed.get(EmployeesInviteService);
    const serviceService = TestBed.get(ServiceService);
    const serviceId = 'a8144dee-5266-4873-ae23-ec6c567521cf';

    service.getConsultationDetails(serviceId);
    expect(serviceService.getServiceRoute).toHaveBeenCalledWith(serviceId);
  });

  it('should send invitations', () => {
    const service = TestBed.get(EmployeesInviteService);
    const invitationService = TestBed.get(InvitationService);
    const serviceId = 'a8144dee-5266-4873-ae23-ec6c567521cf';

    const inviationData = {
      invitations: [
        {
          serviceId,
        },
      ],
    };

    service.postInvitation(inviationData);
    expect(invitationService.postInvitationRoute).toHaveBeenCalledWith(inviationData);
  });
});
