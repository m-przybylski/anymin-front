import { Injectable } from '@angular/core';
import {
  InvitationService,
  ServiceService,
  GetService,
  MoneyDto,
  GetCommissions,
  FinancesService,
} from '@anymind-ng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Logger } from '@platform/core/logger';
import { LoggerFactory, AlertService } from '@anymind-ng/core';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, forkJoin } from 'rxjs';
import { IInvitation } from '@platform/features/dashboard/views/user-dashboard/invitations/services/invitation-list.resolver.service';

@Injectable()
export class AcceptRejectInvitationService extends Logger {
  constructor(
    private invitationService: InvitationService,
    private alertService: AlertService,
    private serviceService: ServiceService,
    private financesService: FinancesService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('AcceptRejectInvitationService'));
  }

  /**
   * Fetch information from backend server following endpoints are involved:
   * GET /api/services/{serviceId}
   * POST /api/finances/commissions { MoneyDto }
   * POST /api/services/tags {serviceIds:[serviceId]}
   * @param invitation invitation object where serviceId is require
   * @returns mapped details about service to display for the user
   */
  public getInvitationDetails = (invitation: IInvitation): Observable<IConsultationDetails> =>
    forkJoin(this.getServiceDetails(invitation.serviceId), this.getTagsForService(invitation.serviceId)).pipe(
      map(([{ getCommissions, getService }, tagList]) => ({
        isFreelance: getService.isFreelance,
        price: getService.price,
        serviceDescription: getService.description,
        tagList,
        getCommissions,
      })),
    );

  /**
   * Accepts invitation. endpoint involved
   * POST /api/invitations/{invitationId}/accept
   * @param invitationId id of invitation to be accepted
   * @param activeModal modal to be closed
   * @returns Cold observable. Once subscribed triggers accept
   */
  public acceptInvitation = (invitationId: string, activeModal: NgbActiveModal): Observable<void> =>
    this.acceptRejectInvitation('ACCEPT')(invitationId, activeModal);

  /**
   * Rejects invitation. endpoint involved
   * POST /api/invitations/{invitationId}/reject
   * @param invitationId id of invitation to be rejected
   * @param activeModal modal to be closed
   * @returns Cold observable. Once subscribed triggers rejection
   */
  public rejectInvitation = (invitationId: string, activeModal: NgbActiveModal): Observable<void> =>
    this.acceptRejectInvitation('REJECT')(invitationId, activeModal);

  public markInvitationAsRead = (invitation: string): Observable<void> =>
    this.invitationService.postInvitationsDisplayedRoute(invitation);

  private getServiceDetails(serviceId: string): Observable<{ getCommissions: GetCommissions; getService: GetService }> {
    return this.serviceService.getServiceRoute(serviceId).pipe(
      switchMap(getService =>
        this.financesService
          .postCommissionsRoute({
            amount: getService.price,
            isFreelance: getService.isFreelance,
          })
          .pipe(map(getCommissions => ({ getCommissions, getService }))),
      ),
    );
  }

  private getTagsForService = (serviceId: string): Observable<ReadonlyArray<string>> =>
    this.serviceService
      .postServicesTagsRoute({ serviceIds: [serviceId] })
      .pipe(
        map(getServiceTagsList =>
          getServiceTagsList
            .filter(getServiceTagList => getServiceTagList.serviceId === serviceId)
            .reduce((tagList, getServiceTags) => [...tagList, ...getServiceTags.tags.map(tag => tag.name)], []),
        ),
      );

  private acceptRejectInvitation = (
    task: 'ACCEPT' | 'REJECT',
  ): ((invitationId: string, activeModal: NgbActiveModal) => Observable<void>) => {
    /**
     * bind is required so the service has a context of execution.
     */
    const acceptReject =
      task === 'ACCEPT'
        ? this.invitationService.postInvitationAcceptRoute.bind(this.invitationService)
        : this.invitationService.postInvitationRejectRoute.bind(this.invitationService);

    return (invitationId: string, activeModal: NgbActiveModal): Observable<void> =>
      acceptReject(invitationId).pipe(
        tap(() => {
          activeModal.close(invitationId);
          this.alertService.pushSuccessAlert(`INVITE_ACCEPT_REJECT.${task}.SUCCESS`);
        }),
        catchError((error: HttpErrorResponse) => {
          this.loggerService.warn('Something went wrong with accepting invitation', error);
          this.alertService.pushDangerAlert(`INVITE_ACCEPT_REJECT.${task}.FAILURE`);

          return throwError(error);
        }),
      );
  };
}

export interface IConsultationDetails {
  isFreelance: boolean;
  price: MoneyDto;
  serviceDescription: string;
  tagList: ReadonlyArray<string>;
  getCommissions: GetCommissions;
}
