import { Injectable } from '@angular/core';
import {
  EmploymentService,
  ProfileService,
  ServiceService,
  ViewsService,
  GetServiceWithEmployees,
  GetProfileWithDocuments,
  ExpertProfileView,
  GetComment,
  PaymentsService,
  DefaultCreditCard,
  FinancesService,
} from '@anymind-ng/api';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, filter, catchError, mergeMap } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';

@Injectable()
export class ConsultationDetailsViewService extends Logger {
  constructor(
    private serviceService: ServiceService,
    private profileService: ProfileService,
    private viewsService: ViewsService,
    private employmentService: EmploymentService,
    private paymentsService: PaymentsService,
    private financesService: FinancesService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
  }

  public getServiceDetails = (serviceId: string, employeeId: string): Observable<IConsultationDetails> =>
    this.serviceService
      .postServiceWithEmployeesRoute({ serviceIds: [serviceId] })
      .pipe(
        map(getServiceWithEmployeesList =>
          getServiceWithEmployeesList.filter(
            getServiceWithEmployees => getServiceWithEmployees.serviceDetails.id === serviceId,
          ),
        ),
        filter(getServiceWithEmployeesList => getServiceWithEmployeesList.length > 0),
        map(getServiceWithEmployeesList => getServiceWithEmployeesList[0]),
        mergeMap(getServiceWithEmployees =>
          this.getComments(this.pluckEmployeeId(getServiceWithEmployees, serviceId)).pipe(
            map(getComments => ({ getServiceWithEmployees, getComments })),
          ),
        ),
      )
      .pipe(
        switchMap(({ getServiceWithEmployees, getComments }) =>
          forkJoin(
            this.profileService.getProfileRoute(getServiceWithEmployees.serviceDetails.ownerProfile.id),
            this.viewsService.getWebExpertProfileRoute(employeeId),
            this.paymentsService.getDefaultPaymentMethodRoute(),
            this.financesService.getClientBalanceRoute().pipe(
              map(balance => ({
                amount: balance.accountBalance.amount + balance.promoCodeBalance.amount,
                currency: balance.accountBalance.currency,
              })),
            ),
          ).pipe(
            map(
              ([expertDetails, expertProfileViewDetails, payment, balance]): IConsultationDetails => ({
                expertDetails,
                expertProfileViewDetails,
                getServiceWithEmployees,
                expertIds: getServiceWithEmployees.employeesDetails.map(
                  employeesDetails => employeesDetails.employeeProfile.id,
                ),
                payment,
                balance,
                getComments,
              }),
            ),
          ),
        ),
      );

  public getServicesTagList = (serviceId: string): Observable<ReadonlyArray<string>> =>
    this.serviceService
      .postServicesTagsRoute({ serviceIds: [serviceId] })
      .pipe(
        map(getServiceTagsList =>
          getServiceTagsList
            .filter(getServiceTag => getServiceTag.serviceId === serviceId)
            .reduce((tagsList, getServiceTags) => [...tagsList, ...getServiceTags.tags.map(tag => tag.name)], []),
        ),
      );

  public addTemporaryComment = (
    commentsList: GetComment,
    commentsConsultation: ReadonlyArray<GetComment>,
  ): ReadonlyArray<GetComment> => {
    const commentsList_first_part = commentsConsultation.slice(0, commentsConsultation.indexOf(commentsList));
    const commentsList_changed_element = commentsConsultation.slice(
      commentsConsultation.indexOf(commentsList),
      commentsConsultation.indexOf(commentsList) + 1,
    );
    const commentsList_second_part = commentsConsultation.slice(
      commentsConsultation.indexOf(commentsList) + 1,
      commentsConsultation.length,
    );

    return [...commentsList_first_part, ...commentsList_changed_element, ...commentsList_second_part];
  };

  public loadMoreComments = (
    commentsList: ReadonlyArray<GetComment>,
    commentsConsultation: ReadonlyArray<GetComment>,
  ): ReadonlyArray<GetComment> => [...commentsConsultation, ...commentsList];

  public editConsultation = (serviceId: string, modal: NgbActiveModal): void => {
    modal.close(serviceId);
  };

  public removeConsultation = (serviceId: string, modal: NgbActiveModal): void => {
    this.serviceService
      .deleteServiceRoute(serviceId)
      .pipe(
        catchError(err => {
          this.alertService.pushDangerAlert('CONSULTATION_DETAILS.ALERT.REMOVE_FAILURE');
          this.loggerService.warn('Cannot remove consultation', err);

          throw err;
        }),
      )
      .subscribe(() => {
        this.alertService.pushSuccessAlert('CONSULTATION_DETAILS.ALERT.REMOVE_SUCCESS');
        this.loggerService.debug('Consultation removed!');
        modal.close(serviceId);
      });
  };

  public leaveConsultation = (serviceId: string, employeementId: string, modal: NgbActiveModal): void => {
    this.employmentService
      .deleteEmploymentRoute(employeementId)
      .pipe(
        catchError(err => {
          this.alertService.pushDangerAlert('CONSULTATION_DETAILS.ALERT.LEAVE_FAILURE');
          this.loggerService.warn('Cannot leave consultation', err);

          throw err;
        }),
      )
      .subscribe(() => {
        this.alertService.pushSuccessAlert('CONSULTATION_DETAILS.ALERT.LEAVE_SUCCESS');
        this.loggerService.debug('Consultation removed!');
        modal.close(serviceId);
      });
  };

  public getComments = (employementId: string, limit = '3', offset = '0'): Observable<ReadonlyArray<GetComment>> =>
    this.employmentService.getEmploymentCommentsRoute(employementId, limit, offset);

  private pluckEmployeeId = (getServiceWithEmployees: GetServiceWithEmployees, serviceId: string): string => {
    const employeeDetail = getServiceWithEmployees.employeesDetails.find(
      employeesDetail => employeesDetail.serviceId === serviceId,
    );

    return employeeDetail ? employeeDetail.id : '';
  };
}

export interface IConsultationDetails {
  expertDetails: GetProfileWithDocuments;
  expertProfileViewDetails: ExpertProfileView;
  getServiceWithEmployees: GetServiceWithEmployees;
  expertIds: ReadonlyArray<string>;
  payment: DefaultCreditCard;
  balance: { amount: number; currency: string };
  getComments: ReadonlyArray<GetComment>;
}
