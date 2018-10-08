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
import { Observable, forkJoin, of, EMPTY } from 'rxjs';
import { map, switchMap, filter, catchError, take, tap } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { ExpertAvailabilityService } from '@platform/features/dashboard/components/expert-availability/expert-availablity.service';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { AuthActions } from '@platform/core/actions';
import { ConfirmationService } from '../confirmation/confirmation.service';

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
    private expertAvailabilityService: ExpertAvailabilityService,
    private store: Store<fromCore.IState>,
    private confirmationService: ConfirmationService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
  }

  public getServiceDetails = (serviceId: string, employeeId: string): Observable<IConsultationDetails> =>
    this.serviceService
      .postServiceWithEmployeesRoute({ serviceIds: [serviceId] })
      .pipe(
        map(getServiceWithEmployeesList =>
          getServiceWithEmployeesList.find(
            getServiceWithEmployees => getServiceWithEmployees.serviceDetails.id === serviceId,
          ),
        ),
        filter(getServiceWithEmployee => getServiceWithEmployee !== undefined),
      )
      .pipe(
        switchMap((getServiceWithEmployees: GetServiceWithEmployees) =>
          forkJoin(
            this.profileService.getProfileRoute(getServiceWithEmployees.serviceDetails.ownerProfile.id),
            this.viewsService.getWebExpertProfileRoute(employeeId),
            this.getComments(this.pluckEmployeeId(getServiceWithEmployees, serviceId)),
            this.paymentsService.getDefaultPaymentMethodRoute().pipe(catchError(() => of({}))),
            this.financesService.getClientBalanceRoute().pipe(
              catchError(() =>
                of({
                  accountBalance: { amount: 0, currency: '' },
                  promoCodeBalance: { amount: 0, currency: '' },
                }),
              ),
              map(balance => ({
                amount: balance.accountBalance.amount + balance.promoCodeBalance.amount,
                currency: balance.accountBalance.currency,
              })),
            ),
          ).pipe(
            map(
              ([expertDetails, expertProfileViewDetails, getComments, payment, balance]): IConsultationDetails => ({
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
    comment: GetComment,
    comments: ReadonlyArray<GetComment>,
  ): ReadonlyArray<GetComment> => {
    const commentFound = comments.find(cmt => cmt.commentId === comment.commentId);
    if (commentFound === undefined) {
      return comments;
    }
    const index = comments.indexOf(commentFound);
    const commentsList_first_part = comments.slice(0, index);
    const commentsList_second_part = comments.slice(index + 1, comments.length);

    return [...commentsList_first_part, comment, ...commentsList_second_part];
  };
  public loadMoreComments = (
    commentsList: ReadonlyArray<GetComment>,
    commentsConsultation: ReadonlyArray<GetComment>,
  ): ReadonlyArray<GetComment> => [...commentsConsultation, ...commentsList];
  public editConsultation = (serviceId: string, modal: NgbActiveModal): void => {
    modal.close(serviceId);
    // TODO: implement logic
  };
  public deleteConsultation = (serviceId: string, modal: NgbActiveModal): void => {
    this.confirmationService
      .confirm('CONSULTATION_DETAILS.DELETE.HEADER', 'CONSULTATION_DETAILS.DELETE.MESSAGE')
      .pipe(
        filter(confirmed => confirmed),
        switchMap(() =>
          this.serviceService.deleteServiceRoute(serviceId).pipe(
            catchError(err => {
              this.alertService.pushDangerAlert('CONSULTATION_DETAILS.ALERT.REMOVE_FAILURE');
              this.loggerService.warn('Cannot remove consultation', err);

              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe(() => {
        this.alertService.pushSuccessAlert('CONSULTATION_DETAILS.ALERT.REMOVE_SUCCESS');
        this.loggerService.debug('Consultation removed!');
        modal.close(serviceId);
      });
  };
  public leaveConsultation = (serviceId: string, modal: NgbActiveModal, employmentId: string): void => {
    this.confirmationService
      .confirm('CONSULTATION_DETAILS.LEAVE.HEADER', 'CONSULTATION_DETAILS.LEAVE.MESSAGE')
      .pipe(
        filter(confirmed => confirmed),
        switchMap(() =>
          this.employmentService.deleteEmploymentRoute(employmentId).pipe(
            catchError(err => {
              this.alertService.pushDangerAlert('CONSULTATION_DETAILS.ALERT.LEAVE_FAILURE');
              this.loggerService.warn('Cannot leave consultation', err);

              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe(() => {
        this.alertService.pushSuccessAlert('CONSULTATION_DETAILS.ALERT.LEAVE_SUCCESS');
        this.loggerService.debug('Consultation removed!');
        modal.close(serviceId);
      });
  };
  public makeCall = (_: string, modal: NgbActiveModal): void => {
    // check if user is logged. If not navigate to login page
    modal.close();
    this.store
      .pipe(
        select(fromCore.getLoggedIn),
        tap(login => {
          if (!login.isLoggedIn) {
            this.store.dispatch(new AuthActions.LoginRedirectAction());
          }
        }),
      )
      .subscribe();

    // TODO: implement functionality
  };
  public notifyUser = (): void => {
    // TODO: implement functionality
  };
  public getExpertAvailability = (expertId: string): Observable<boolean> =>
    this.expertAvailabilityService.getExpertPresence(expertId).pipe(
      take(1),
      map(status => status === 'available'),
    );
  public getComments = (employmentId: string, limit = '3', offset = '0'): Observable<ReadonlyArray<GetComment>> =>
    this.employmentService.getEmploymentCommentsRoute(employmentId, limit, offset);

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
