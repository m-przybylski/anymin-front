// tslint:disable:readonly-array

import { Injectable } from '@angular/core';
import { EmploymentService, InvitationService, ServiceService } from '@anymind-ng/api';
import { ExpertProfileWithEmployments } from '@anymind-ng/api/model/expertProfileWithEmployments';
import { Observable } from 'rxjs';
import { PostInvitations } from '@anymind-ng/api/model/postInvitations';
import { GetServiceWithInvitations } from '@anymind-ng/api/model/getServiceWithInvitations';
import { CommonSettingsService } from '../../../../../angularjs/common/services/common-settings/common-settings.service';
import { GetService } from '@anymind-ng/api/model/getService';
import { Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';

export enum EmployeeInvitationTypeEnum {
  IS_EMAIL,
  IS_MSIDN,
  IS_PENDING,
  IS_ALREADY_ADDED,
  INVALID,
}

export interface IEmployeesPendingInvitation {
  email?: string;
  msisdn?: string;
}

@Injectable()
export class EmployeesInviteService {
  private emailPattern: RegExp;
  private phoneNumberPattern: RegExp;
  private employeesWithPendingInvitaitons: IEmployeesPendingInvitation[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private employmentService: EmploymentService,
    private serviceService: ServiceService,
    private invitationService: InvitationService,
    commonSettingsService: CommonSettingsService,
  ) {
    this.phoneNumberPattern = commonSettingsService.localSettings.phoneNumberPattern;
    this.emailPattern = commonSettingsService.localSettings.emailPattern;
  }

  public getEmployeeList = (): Observable<ExpertProfileWithEmployments[]> => this.employmentService.getEmployeesRoute();

  public getInvitations = (serviceId: string): Observable<GetServiceWithInvitations[]> =>
    this.serviceService.postServiceInvitationsRoute({ serviceIds: [serviceId] });

  public getConsultationDetails = (serviceId: string): Observable<GetService> =>
    this.serviceService.getServiceRoute(serviceId);

  public postInvitation = (data: PostInvitations): Observable<PostInvitations> =>
    this.invitationService.postInvitationRoute(data);

  public checkInvitationType = (value: string): EmployeeInvitationTypeEnum => {
    if (this.isInvitationPending(value)) {
      return EmployeeInvitationTypeEnum.IS_PENDING;
    } else if (this.isValuePhoneNumber(value)) {
      return EmployeeInvitationTypeEnum.IS_MSIDN;
    } else if (this.isValueEmailAddress(value)) {
      return EmployeeInvitationTypeEnum.IS_EMAIL;
    } else {
      return EmployeeInvitationTypeEnum.INVALID;
    }
  };

  public checkPendingInvitations = (serviceId: string): void => {
    this.getInvitations(serviceId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(serviceWithInvitation => {
        this.employeesWithPendingInvitaitons = serviceWithInvitation[0].invitations
          .filter(item => item.status === 'NEW')
          .map(item => ({
            email: item.email,
            msisdn: item.msisdn,
          }));
      });
  };

  private isValuePhoneNumber = (value: string): boolean => this.phoneNumberPattern.test(value);
  private isValueEmailAddress = (value: string): boolean => this.emailPattern.test(value);
  private isInvitationPending = (value: string): boolean =>
    this.employeesWithPendingInvitaitons.filter(item => item.email === value || item.msisdn === value).length > 0;
}
