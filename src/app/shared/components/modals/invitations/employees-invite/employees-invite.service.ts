import { Injectable } from '@angular/core';
import {
  EmploymentService,
  ExpertProfileWithEmployments,
  GetInvitation,
  GetSessionWithAccount,
  InvitationService,
  ServiceService,
} from '@anymind-ng/api';
import { forkJoin, Observable } from 'rxjs';
import { PostInvitations } from '@anymind-ng/api/model/postInvitations';
import { GetServiceWithInvitations } from '@anymind-ng/api/model/getServiceWithInvitations';
import { GetService } from '@anymind-ng/api/model/getService';
import { filter, first, map } from 'rxjs/operators';
import { IEmployeesInviteComponent } from './employees-invite.component';
import { isValidNumber } from 'libphonenumber-js';
import { PhoneNumberUnifyService } from '@platform/shared/services/phone-number-unify/phone-number-unify.service';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { Config } from '../../../../../../config';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';

export enum EmployeeInvitationTypeEnum {
  IS_EMAIL,
  IS_MSISDN,
  IS_PENDING,
  IS_ALREADY_ADDED,
  OWNER_USER,
  MAX_LENGTH_REACHED,
  INVALID,
}

export interface IEmployeesPendingInvitation {
  email?: string;
  msisdn?: string;
  employeeId?: string;
}

export interface IEmployeesNewInvitations {
  invitations: ReadonlyArray<string>;
  employeeInvitations: ReadonlyArray<IEmployeesPendingInvitation>;
}

export interface IEmployeesList {
  employeeList: ReadonlyArray<IEmployeesInviteComponent>;
  pendingInvitations: IEmployeesNewInvitations;
}

@Injectable()
export class EmployeesInviteService {
  private readonly maxInvitationLength: number;
  private employeesWithPendingInvitations: ReadonlyArray<IEmployeesPendingInvitation> = [];
  private emailPattern: RegExp;
  private invitedEmployeeList: ReadonlyArray<IEmployeesInviteComponent> = [];
  private accountId: string;
  private accountMsisdn: string;
  private accountEmail: string;

  constructor(
    private employmentService: EmploymentService,
    private serviceService: ServiceService,
    private phoneNumberUnifyService: PhoneNumberUnifyService,
    private invitationService: InvitationService,
    private store: Store<fromCore.IState>,
  ) {
    this.emailPattern = Config.patterns.emailPattern;
    this.maxInvitationLength = Config.inputsLengthNumbers.consultationInvitationsMaxCount;
    getNotUndefinedSession(this.store)
      .pipe(first())
      .subscribe((session: GetSessionWithAccount) => {
        this.accountId = session.account.id;
        this.accountMsisdn = session.account.msisdn;
        if (typeof session.account.email !== 'undefined') {
          this.accountEmail = session.account.email;

          return;
        }
        if (typeof session.account.unverifiedEmail !== 'undefined') {
          this.accountEmail = session.account.unverifiedEmail;

          return;
        }
      });
  }

  public getUserAccountId = (): string => this.accountId;

  public getConsultationDetails = (serviceId: string): Observable<GetService> =>
    this.serviceService.getServiceRoute(serviceId);

  public postInvitation = (data: PostInvitations): Observable<ReadonlyArray<GetInvitation>> =>
    this.invitationService.postInvitationRoute(data);

  // tslint:disable-next-line:cyclomatic-complexity
  public checkInvitationType = (value: string, isFreelanceService: boolean): EmployeeInvitationTypeEnum => {
    const unifiedPhoneNumber = this.phoneNumberUnifyService.unifyPhoneNumber(value);
    if (this.isMaxLengthInvitationReached()) {
      return EmployeeInvitationTypeEnum.MAX_LENGTH_REACHED;
    }
    if (this.isInvitationPending(value) || this.isInvitationPending(unifiedPhoneNumber)) {
      return EmployeeInvitationTypeEnum.IS_PENDING;
    }
    if (isValidNumber(unifiedPhoneNumber)) {
      /**
       * if consultation is freelance we need to check if user provided his msisdn
       * because he can not invite himself to freelance service
       */
      if (isFreelanceService && unifiedPhoneNumber === this.accountMsisdn) {
        return EmployeeInvitationTypeEnum.OWNER_USER;
      }

      return EmployeeInvitationTypeEnum.IS_MSISDN;
    }
    if (this.isValidEmailAddress(value)) {
      /**
       * if consultation is freelance we need to check if user provided his email
       * because he can not invite himself to freelance service
       */
      if (isFreelanceService && value === this.accountEmail) {
        return EmployeeInvitationTypeEnum.OWNER_USER;
      }

      return EmployeeInvitationTypeEnum.IS_EMAIL;
    }

    return EmployeeInvitationTypeEnum.INVALID;
  };

  public mapEmployeeList = (serviceId: string): Observable<IEmployeesList> =>
    forkJoin(
      this.employmentService.getEmployeesRoute().pipe(
        map((response: ReadonlyArray<ExpertProfileWithEmployments>) =>
          response
            .filter(item => item.employments.every(employment => employment.serviceId !== serviceId))
            .map(employeeProfile => ({
              name: employeeProfile.expertProfile.name,
              avatar: employeeProfile.expertProfile.avatar,
              employeeId: employeeProfile.employments[0] ? employeeProfile.employments[0].employeeId : '',
              serviceId: employeeProfile.employments[0] ? employeeProfile.employments[0].serviceId : '',
              id: employeeProfile.expertProfile.id,
            })),
        ),
      ),
      this.serviceService.postServiceInvitationsRoute({ serviceIds: [serviceId] }).pipe(
        map(services => services.find(service => service.service.id === serviceId)),
        filter(service => typeof service !== 'undefined'),
        map((status: GetServiceWithInvitations) => {
          this.employeesWithPendingInvitations = this.getUnAcceptedInvitations(status);

          const invitations: ReadonlyArray<string> = this.employeesWithPendingInvitations.reduce(
            (contactList, contact) => [...contactList, this.getStringValue(contact)],
            [],
          );

          return {
            invitations,
            employeeInvitations: this.employeesWithPendingInvitations.filter(item => item.employeeId),
          };
        }),
      ),
    ).pipe(
      map(([consultationEmployees, pendingInvitations]) => {
        const employeeList = consultationEmployees.filter(obj =>
          pendingInvitations.employeeInvitations.every(
            (pendingEmployeeId: IEmployeesPendingInvitation) => obj.employeeId !== pendingEmployeeId.employeeId,
          ),
        );

        return { employeeList, pendingInvitations };
      }),
    );

  public setInvitedEmployeeList = (
    employeeList: ReadonlyArray<IEmployeesInviteComponent>,
  ): ReadonlyArray<IEmployeesInviteComponent> => (this.invitedEmployeeList = employeeList);

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
      employeeId: item.employeeId,
    }));

  private isMaxLengthInvitationReached = (): boolean => this.invitedEmployeeList.length >= this.maxInvitationLength;
  private isValidEmailAddress = (value: string): boolean => this.emailPattern.test(value);
  private isInvitationPending = (value: string): boolean =>
    this.employeesWithPendingInvitations.filter(item => item.email === value || item.msisdn === value).length > 0;
}
