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
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, filter, catchError, take } from 'rxjs/operators';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { ExpertAvailabilityService } from '@platform/features/dashboard/components/expert-availability/expert-availablity.service';

@Injectable()
export class ConsultationDetailsViewService extends Logger {
  constructor(
    private serviceService: ServiceService,
    private profileService: ProfileService,
    private viewsService: ViewsService,
    private employmentService: EmploymentService,
    private paymentsService: PaymentsService,
    private financesService: FinancesService,
    private expertAvailabilityService: ExpertAvailabilityService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ConsultationDetailsViewService'));
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
            this.getComments(this.pluckEmploymentId(getServiceWithEmployees, serviceId)),
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
                employmentId: this.pluckEmploymentId(getServiceWithEmployees, serviceId),
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
  public getExpertAvailability = (expertId: string): Observable<boolean> =>
    this.expertAvailabilityService.getExpertPresence(expertId).pipe(
      take(1),
      map(status => status === 'available'),
    );
  public getComments = (employmentId: string, limit = '3', offset = '0'): Observable<ReadonlyArray<GetComment>> =>
    this.employmentService.getEmploymentCommentsRoute(employmentId, limit, offset);

  private pluckEmploymentId = (getServiceWithEmployees: GetServiceWithEmployees, serviceId: string): string => {
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
  employmentId: string;
  expertIds: ReadonlyArray<string>;
  payment: DefaultCreditCard;
  balance: { amount: number; currency: string };
  getComments: ReadonlyArray<GetComment>;
}
