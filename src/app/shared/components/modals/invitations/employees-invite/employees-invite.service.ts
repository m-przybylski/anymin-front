import { Injectable } from '@angular/core';
import { EmploymentService, InvitationService, ServiceService } from '@anymind-ng/api';
import { ExpertProfileWithEmployments } from '@anymind-ng/api/model/expertProfileWithEmployments';
import { Observable } from 'rxjs';
import { PostInvitations } from '@anymind-ng/api/model/postInvitations';
import { GetServiceWithInvitations } from '@anymind-ng/api/model/getServiceWithInvitations';
import { GetService } from '@anymind-ng/api/model/getService';
import { filter, map } from 'rxjs/operators';
import { IEmployeesInviteComponent } from './employees-invite.component';
import { isValidNumber } from 'libphonenumber-js';
import { PhoneNumberUnifyService } from '@platform/shared/services/phone-number-unify/phone-number-unify.service';
import { CommonSettingsService } from 'angularjs/common/services/common-settings/common-settings.service';

export enum EmployeeInvitationTypeEnum {
  IS_EMAIL,
  IS_MSIDN,
  IS_PENDING,
  IS_ALREADY_ADDED,
  MAX_LENGTH_REACHED,
  INVALID,
}

export interface IEmployeesPendingInvitation {
  email?: string;
  msisdn?: string;
}

@Injectable()
export class EmployeesInviteService {
  private employeesWithPendingInvitaitons: ReadonlyArray<IEmployeesPendingInvitation> = [];
  private emailPattern: RegExp;
  private maxInvitationLength: number;
  private invitedEmployeeList: ReadonlyArray<IEmployeesInviteComponent> = [];

  constructor(
    private employmentService: EmploymentService,
    private serviceService: ServiceService,
    private phoneNumberUnifyService: PhoneNumberUnifyService,
    private invitationService: InvitationService,
    commonSettingsService: CommonSettingsService,
  ) {
    this.emailPattern = commonSettingsService.localSettings.emailPattern;
    this.maxInvitationLength = commonSettingsService.localSettings.consultationInvitationsMaxCount;
  }

  public getEmployeeList = (): Observable<ReadonlyArray<ExpertProfileWithEmployments>> =>
    this.employmentService.getEmployeesRoute();

  public getInvitations = (serviceId: string): Observable<ReadonlyArray<GetServiceWithInvitations>> =>
    this.serviceService.postServiceInvitationsRoute({ serviceIds: [serviceId] });

  public getConsultationDetails = (serviceId: string): Observable<GetService> =>
    this.serviceService.getServiceRoute(serviceId);

  public postInvitation = (data: PostInvitations): Observable<PostInvitations> =>
    this.invitationService.postInvitationRoute(data);

  public checkInvitationType = (value: string): EmployeeInvitationTypeEnum => {
    if (this.isMaxLengthInvitationReached()) {
      return EmployeeInvitationTypeEnum.MAX_LENGTH_REACHED;
    } else if (
      this.isInvitationPending(value) ||
      this.isInvitationPending(this.phoneNumberUnifyService.unifyPhoneNumber(value))
    ) {
      return EmployeeInvitationTypeEnum.IS_PENDING;
    } else if (isValidNumber(this.phoneNumberUnifyService.unifyPhoneNumber(value))) {
      return EmployeeInvitationTypeEnum.IS_MSIDN;
    } else if (this.isValueEmailAddress(value)) {
      return EmployeeInvitationTypeEnum.IS_EMAIL;
    } else {
      return EmployeeInvitationTypeEnum.INVALID;
    }
  };

  public setInvitedEmployeeList = (
    employeeList: ReadonlyArray<IEmployeesInviteComponent>,
  ): ReadonlyArray<IEmployeesInviteComponent> => (this.invitedEmployeeList = employeeList);

  public checkPendingInvitations = (serviceId: string): Observable<ReadonlyArray<string>> =>
    this.getInvitations(serviceId).pipe(
      map(services => services.find(service => service.service.id === serviceId)),
      filter(service => typeof service !== 'undefined'),
      map((status: GetServiceWithInvitations) => {
        this.employeesWithPendingInvitaitons = this.getUnAcceptedInvitations(status);

        return this.employeesWithPendingInvitaitons;
      }),
      map((invitations: ReadonlyArray<IEmployeesPendingInvitation>) =>
        invitations.reduce((contactList, contact) => [...contactList, this.getStringValue(contact)], []),
      ),
    );

  private getStringValue = (item: { email?: string; msisdn?: string }): string => {
    if (typeof item.email !== 'undefined') {
      return item.email;
    }
    if (typeof item.msisdn !== 'undefined') {
      return item.msisdn;
    }

    return '';
  };

  private getUnAcceptedInvitations = (
    serviceWithInvitation: GetServiceWithInvitations,
  ): ReadonlyArray<IEmployeesPendingInvitation> =>
    serviceWithInvitation.invitations.filter(item => item.status === 'NEW').map(item => ({
      email: item.email,
      msisdn: item.msisdn,
    }));

  private isMaxLengthInvitationReached = (): boolean => this.invitedEmployeeList.length >= this.maxInvitationLength;
  private isValueEmailAddress = (value: string): boolean => this.emailPattern.test(value);
  private isInvitationPending = (value: string): boolean =>
    this.employeesWithPendingInvitaitons.filter(item => item.email === value || item.msisdn === value).length > 0;
}
