import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
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
  GetDefaultPaymentMethod,
  GetCreditCard,
  FinancesService,
  PostCommissions,
  GetCommissions,
} from '@anymind-ng/api';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { map, switchMap, filter, take, catchError } from 'rxjs/operators';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { ExpertAvailabilityService } from '@platform/features/dashboard/components/expert-availability/expert-availablity.service';
import { ConsultationFootersService } from './consultation-footers.service';
import {
  IFooterOutput,
  FooterComponentConstructor,
  IConsultationFooterData,
} from './consultation-footers/consultation-footer-helpers';
import { httpCodes } from '@platform/shared/constants/httpCodes';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ConsultationDetailsViewService extends Logger {
  constructor(
    private serviceService: ServiceService,
    private profileService: ProfileService,
    private viewsService: ViewsService,
    private employmentService: EmploymentService,
    private paymentsService: PaymentsService,
    private expertAvailabilityService: ExpertAvailabilityService,
    private consultationFootersService: ConsultationFootersService,
    private financesService: FinancesService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ConsultationDetailsViewService'));
  }

  public getServiceDetails(serviceId: string, employeeId: string): Observable<IConsultationDetails> {
    return this.serviceService.postServiceWithEmployeesRoute({ serviceIds: [serviceId] }).pipe(
      map(getServiceWithEmployeesList =>
        getServiceWithEmployeesList.find(
          getServiceWithEmployees => getServiceWithEmployees.serviceDetails.id === serviceId,
        ),
      ),
      filter(getServiceWithEmployee => getServiceWithEmployee !== undefined),
      switchMap((getServiceWithEmployees: GetServiceWithEmployees) =>
        forkJoin(
          this.profileService.getProfileRoute(getServiceWithEmployees.serviceDetails.ownerProfile.id),
          this.viewsService.getWebExpertProfileRoute(employeeId),
          this.getComments(this.pluckEmploymentId(getServiceWithEmployees, serviceId, employeeId)),
          this.getPaymentMethod(),
          this.getCommission({
            amount: getServiceWithEmployees.serviceDetails.price,
            isFreelance: getServiceWithEmployees.serviceDetails.isFreelance,
          }),
        ).pipe(
          map(
            ([
              expertOrOrganizationDetails,
              expertProfileViewDetails,
              getComments,
              { defaultPaymentMethod, getCreditCard },
              getCommissions,
            ]): IConsultationDetails => ({
              expertOrOrganizationDetails,
              expertProfileViewDetails,
              getServiceWithEmployees,
              employmentId: this.pluckEmploymentId(getServiceWithEmployees, serviceId, employeeId),
              expertIds: getServiceWithEmployees.employeesDetails.map(
                employeesDetails => employeesDetails.employeeProfile.id,
              ),
              defaultPaymentMethod,
              creditCards: getCreditCard,
              getComments,
              getCommissions,
            }),
          ),
        ),
      ),
    );
  }

  public getServicesTagList(serviceId: string): Observable<ReadonlyArray<string>> {
    return this.serviceService
      .postServicesTagsRoute({ serviceIds: [serviceId] })
      .pipe(
        map(getServiceTagsList =>
          getServiceTagsList
            .filter(getServiceTag => getServiceTag.serviceId === serviceId)
            .reduce((tagsList, getServiceTags) => [...tagsList, ...getServiceTags.tags.map(tag => tag.name)], []),
        ),
      );
  }

  public addTemporaryComment(comment: GetComment, comments: ReadonlyArray<GetComment>): ReadonlyArray<GetComment> {
    const commentFound = comments.find(cmt => cmt.commentId === comment.commentId);
    if (commentFound === undefined) {
      return comments;
    }
    const index = comments.indexOf(commentFound);
    const commentsList_first_part = comments.slice(0, index);
    const commentsList_second_part = comments.slice(index + 1, comments.length);

    return [...commentsList_first_part, comment, ...commentsList_second_part];
  }

  public loadMoreComments(
    commentsList: ReadonlyArray<GetComment>,
    commentsConsultation: ReadonlyArray<GetComment>,
  ): ReadonlyArray<GetComment> {
    return [...commentsConsultation, ...commentsList];
  }

  public getExpertAvailability(expertId: string): Observable<boolean> {
    return this.expertAvailabilityService.getExpertPresence(expertId).pipe(
      take(1),
      map(status => status === 'available'),
    );
  }

  public getComments(employmentId: string, limit = '3', offset = '0'): Observable<ReadonlyArray<GetComment>> {
    return this.employmentService.getEmploymentCommentsRoute(employmentId, limit, offset);
  }

  public attachFooter(
    component: FooterComponentConstructor,
    viewContainerRef: ViewContainerRef,
    footerData: IConsultationFooterData,
  ): ComponentRef<IFooterOutput> {
    return this.consultationFootersService.attachFooter(component, viewContainerRef, footerData);
  }

  private pluckEmploymentId(
    getServiceWithEmployees: GetServiceWithEmployees,
    serviceId: string,
    expertId: string,
  ): string {
    const employeeDetail = getServiceWithEmployees.employeesDetails.find(
      employeesDetail => employeesDetail.serviceId === serviceId && employeesDetail.employeeProfile.id === expertId,
    );

    return employeeDetail ? employeeDetail.id : '';
  }

  private getPaymentMethod(): Observable<IPaymentMethod> {
    return this.paymentsService.getDefaultPaymentMethodRoute().pipe(
      switchMap(defaultPaymentMethod =>
        defaultPaymentMethod.creditCardId !== undefined
          ? this.paymentsService.getCreditCardsRoute().pipe(
              map(getCreditCard => ({
                defaultPaymentMethod,
                getCreditCard,
              })),
            )
          : of({ defaultPaymentMethod, getCreditCard: [] }),
      ),
      catchError(() => of({ defaultPaymentMethod: {}, getCreditCard: [] })),
    );
  }

  private getCommission(servicePrice: PostCommissions): Observable<GetCommissions> {
    return this.financesService.postCommissionsRoute(servicePrice).pipe(
      // for not logged user
      catchError((err: HttpErrorResponse) => {
        if (err.status === httpCodes.unauthorized) {
          return of({
            profileAmount: {
              value: 0,
              currency: '',
            },
          });
        }

        return throwError(err);
      }),
    );
  }
}

export interface IConsultationDetails {
  expertOrOrganizationDetails: GetProfileWithDocuments;
  expertProfileViewDetails: ExpertProfileView;
  getServiceWithEmployees: GetServiceWithEmployees;
  employmentId: string;
  expertIds: ReadonlyArray<string>;
  defaultPaymentMethod: GetDefaultPaymentMethod;
  creditCards: ReadonlyArray<GetCreditCard>;
  getComments: ReadonlyArray<GetComment>;
  getCommissions: GetCommissions;
}

interface IPaymentMethod {
  defaultPaymentMethod: GetDefaultPaymentMethod;
  getCreditCard: ReadonlyArray<GetCreditCard>;
}
