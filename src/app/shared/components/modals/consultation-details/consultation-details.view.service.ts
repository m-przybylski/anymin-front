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
import { map, switchMap, filter } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ConsultationDetailsViewService {
  constructor(
    private serviceService: ServiceService,
    private profileService: ProfileService,
    private viewsService: ViewsService,
    private employmentService: EmploymentService,
    private paymentsService: PaymentsService,
    private financesService: FinancesService,
  ) {}

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
      )
      .pipe(
        switchMap(getServiceWithEmployees =>
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

  public getComments = (employementId: string, limit = '3', offset = '0'): Observable<ReadonlyArray<GetComment>> =>
    this.employmentService.getEmploymentCommentsRoute(employementId, limit, offset);

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

  public editConsultation = (consultationId: string, modal: NgbActiveModal): void => {
    modal.close(consultationId);
  };
}

export interface IConsultationDetails {
  expertDetails: GetProfileWithDocuments;
  expertProfileViewDetails: ExpertProfileView;
  getServiceWithEmployees: GetServiceWithEmployees;
  expertIds: ReadonlyArray<string>;
  payment: DefaultCreditCard;
  balance: { amount: number; currency: string };
}
