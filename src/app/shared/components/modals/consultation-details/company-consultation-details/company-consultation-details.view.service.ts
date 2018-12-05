import { Injectable } from '@angular/core';
import {
  EmploymentService,
  GetInvitation,
  InvitationService,
  ProfileService,
  ServiceService,
  PaymentsService,
  GetServiceWithEmployees,
  GetDefaultPaymentMethod,
} from '@anymind-ng/api';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { map, switchMap, catchError } from 'rxjs/operators';
import { GetServiceWithInvitations } from '@anymind-ng/api/model/getServiceWithInvitations';
import { EMPTY, forkJoin, iif, of, Observable, throwError } from 'rxjs';
import { ICompanyEmployeeRowComponent } from './company-employee-row/company-employee-row.component';
import { EmploymentWithExpertProfile } from '@anymind-ng/api/model/employmentWithExpertProfile';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';

export interface ICompanyConsultationDetails {
  tagsList: ReadonlyArray<string>;
  serviceDetails: GetServiceWithEmployees;
  employeesList: ReadonlyArray<ICompanyEmployeeRowComponent>;
  payment: GetDefaultPaymentMethod;
  balance: { amount: number; currency: string };
}

@Injectable()
export class CompanyConsultationDetailsViewService extends Logger {
  constructor(
    private serviceService: ServiceService,
    private employmentService: EmploymentService,
    private invitationService: InvitationService,
    private profileService: ProfileService,
    private paymentsService: PaymentsService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CompanyConsultationDetailsViewService'));
  }

  public getConsultationDetails = (serviceId: string): Observable<ICompanyConsultationDetails> =>
    forkJoin(
      this.serviceService
        .postServicesTagsRoute({ serviceIds: [serviceId] })
        .pipe(
          map(getServiceTagsList =>
            getServiceTagsList
              .filter(getServiceTag => getServiceTag.serviceId === serviceId)
              .reduce((tagsList, getServiceTags) => [...tagsList, ...getServiceTags.tags.map(tag => tag.name)], []),
          ),
        ),
      this.serviceService.postServiceWithEmployeesRoute({ serviceIds: [serviceId] }).pipe(
        map(getServiceWithEmployeesList =>
          getServiceWithEmployeesList.find(
            getServiceWithEmployees => getServiceWithEmployees.serviceDetails.id === serviceId,
          ),
        ),
        map(getServiceWithEmployees => {
          if (typeof getServiceWithEmployees === 'undefined') {
            throwError(new Error('Not able to get service details'));
          }

          return getServiceWithEmployees;
        }),
        switchMap((getServiceWithEmployees: GetServiceWithEmployees) =>
          this.profileService
            .getProfileRoute(getServiceWithEmployees.serviceDetails.ownerProfile.id)
            .pipe(map(profileDetails => ({ getServiceWithEmployees, profileDetails }))),
        ),
      ),
      // TODO FIX_NEW_FINANCE_MODEL
      this.paymentsService.getDefaultPaymentMethodRoute().pipe(
        /**
         * return {} object when error on the server
         * error happens for not logged user 401 response.
         * represents the same response as no default payment
         */
        catchError(() => of({})),
      ),
    ).pipe(
      map(
        ([tagsList, serviceDetails, payment]): ICompanyConsultationDetails => ({
          tagsList,
          serviceDetails: serviceDetails.getServiceWithEmployees,
          employeesList: serviceDetails.getServiceWithEmployees.employeesDetails.map(employee =>
            this.mapEmployeesList(employee),
          ),
          payment,
          balance: { amount: 0, currency: '' },
        }),
      ),
      catchError(error => {
        this.loggerService.error('Can not get profile: ', error);

        return EMPTY;
      }),
    );

  public deletePendingInvitation = (invitationId: string): Observable<void> =>
    this.invitationService.deleteInvitationsRoute({ invitationsIds: [invitationId] });

  public deleteEmployee = (employmentId: string): Observable<void> =>
    this.employmentService.deleteEmploymentRoute(employmentId);

  public getInvitations = (consultationId: string): Observable<ReadonlyArray<ICompanyEmployeeRowComponent>> =>
    this.getPendingInvitation(consultationId).pipe(
      map(serviceWithInvitations => serviceWithInvitations[0].invitations),
      map((invitations: ReadonlyArray<GetInvitation>) =>
        invitations.filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW),
      ),
      switchMap(invitations => {
        const employees = invitations.filter(item => item.employeeId);
        const pendingInvitations = invitations.filter(item => typeof item.employeeId === 'undefined').map(item => ({
          name: item.msisdn || item.email || '',
          id: item.id,
          // todo delete email, msisdn properties after https://anymind.atlassian.net/browse/PLAT-538
          email: item.email,
          msisdn: item.msisdn,
        }));

        return iif(
          () => employees.length > 0,
          forkJoin(
            employees.map(employee =>
              this.profileService.getProfileRoute(employee.employeeId as string).pipe(
                map(
                  (res: GetProfileWithDocuments): ICompanyEmployeeRowComponent => ({
                    name: res.profile.expertDetails ? res.profile.expertDetails.name : '',
                    id: res.profile.id,
                    avatar: res.profile.expertDetails ? res.profile.expertDetails.avatar : '',
                    employeeId: employee.id,
                    invitedExpertAccountId: res.profile.id,
                  }),
                ),
              ),
            ),
          ),
          of([]),
        ).pipe(
          map(
            (
              employeeInvitations: ReadonlyArray<ICompanyEmployeeRowComponent>,
            ): ReadonlyArray<ICompanyEmployeeRowComponent> => [...employeeInvitations, ...pendingInvitations],
          ),
          catchError(error => {
            this.loggerService.error('Can not return employee and invitations object: ', error);

            return EMPTY;
          }),
        );
      }),
    );

  private mapEmployeesList = (employee: EmploymentWithExpertProfile): ICompanyEmployeeRowComponent => ({
    usageCounter: employee.usageCounter,
    commentCounter: employee.commentCounter,
    ratingCounter: employee.rating,
    id: employee.id,
    name: employee.employeeProfile.name,
    avatar: employee.employeeProfile.avatar,
    employeeId: employee.employeeProfile.id,
  });
  private getPendingInvitation = (serviceId: string): Observable<ReadonlyArray<GetServiceWithInvitations>> =>
    this.serviceService.postServiceInvitationsRoute({ serviceIds: [serviceId] });
}
