import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@platform/core/logger';
import {
  IFooterOutput,
  CONSULTATION_FOOTER_DATA,
  IConsultationFooterData,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer-helpers';
import { Observable, Subject, defer, of } from 'rxjs';
import { LoggerFactory, MoneyToAmount } from '@anymind-ng/core';
import { ConsultationDetailsActionsService } from '@platform/shared/components/modals/consultation-details/consultation-details-actions.service';
import { EmploymentWithExpertProfile, ExpertPresenceStatus } from '@anymind-ng/api';
import VatRateTypeEnum = EmploymentWithExpertProfile.VatRateTypeEnum;
import { Router } from '@angular/router';
import { RouterPaths } from '@platform/shared/routes/routes';
import { ExpertAvailabilityService } from '@platform/features/dashboard/components/expert-availability/expert-availablity.service';
import { startWith, map, takeUntil, mergeMap } from 'rxjs/operators';
import { CallStatusService } from '@platform/shared/components/modals/consultation-details/call-status.service';
import { Animations } from '@platform/shared/animations/animations';

export enum MiddlePanelStatusTypes {
  freeMinute,
  paymentCard,
  noPaymentMethod,
  notAvailable,
  freeConsultation,
  promoCodes,
}

@Component({
  templateUrl: 'consultation-footer-user.component.html',
  styleUrls: ['consultation-footer-user.component.sass'],
  animations: [Animations.fadeOut, Animations.fadeInWithDelay],
})
export class ConsultationFooterUserComponent extends Logger implements IFooterOutput, OnDestroy, OnInit {
  public get actionTaken$(): Observable<keyof ConsultationDetailsActionsService> {
    return this._actionTaken$.asObservable();
  }

  public get grossPrice(): string {
    return this.moneyPipe.transform(this.data.price) || this.moneyPipe.transform({ value: 0, currency: '' });
  }

  public get middlePanel(): Observable<MiddlePanelStatusTypes> {
    return this.data$.pipe(
      map(data => {
        if (data.userId === undefined) {
          return MiddlePanelStatusTypes.freeMinute;
        }
        if (!data.isExpertAvailable) {
          return MiddlePanelStatusTypes.notAvailable;
        }
        if (this.checkIsFreeConsultation(data)) {
          return MiddlePanelStatusTypes.freeConsultation;
        }
        if (data.defaultPaymentMethod.promoCodeId !== undefined) {
          return MiddlePanelStatusTypes.promoCodes;
        }

        if (data.defaultPaymentMethod.creditCardId === undefined) {
          return MiddlePanelStatusTypes.noPaymentMethod;
        }

        return MiddlePanelStatusTypes.paymentCard;
      }),
    );
  }
  public middlePanelStatusTypes = MiddlePanelStatusTypes;
  public isExpertAvailable$: Observable<boolean>;
  public isCallButtonLoading = false;
  public isNotifyRequestSended = false;

  public get card(): string {
    const currentCreditCard = this.data.creditCards.find(
      creditCard => creditCard.id === this.data.defaultPaymentMethod.creditCardId,
    );

    return currentCreditCard !== undefined ? `${currentCreditCard.cardType}${currentCreditCard.maskedNumber}` : '';
  }

  public get invoiceTrKey(): string {
    switch (this.data.vatRateType) {
      case VatRateTypeEnum.COMPANY0:
        return 'CONSULTATION_DETAILS.FOOTER.INVOICE_0';
      case VatRateTypeEnum.COMPANY23:
        return 'CONSULTATION_DETAILS.FOOTER.INVOICE_23';
      case VatRateTypeEnum.NATURALPERSON:
        return 'CONSULTATION_DETAILS.FOOTER.NO_INVOICE';
      default:
        this.loggerService.error('Unknown vat rate state');

        return '';
    }
  }

  private _actionTaken$ = new Subject<keyof ConsultationDetailsActionsService>();
  private moneyPipe = new MoneyToAmount(this.loggerService);
  private ngDestroy$ = new Subject<void>();
  private data$: Observable<IConsultationFooterData>;

  constructor(
    @Inject(CONSULTATION_FOOTER_DATA) private data: IConsultationFooterData,
    private expertAvailabilityService: ExpertAvailabilityService,
    private router: Router,
    private callStatusService: CallStatusService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ConsultationFooterUserComponent'));
  }

  public ngOnInit(): void {
    /** there will be one element if user have selected expert */
    this.isExpertAvailable$ = defer(() => {
      if (this.data.selectedExpertId !== undefined) {
        return this.expertAvailabilityService.getExpertPresence(this.data.selectedExpertId).pipe(
          map(presence => presence === ExpertPresenceStatus.StatusEnum.Available),
          startWith(this.data.isExpertAvailable),
        );
      }

      return of(this.data.isExpertAvailable);
    });

    this.data$ = of(this.data).pipe(
      mergeMap(data =>
        this.isExpertAvailable$.pipe(
          map(isExpertAvailable => ({
            ...data,
            isExpertAvailable,
          })),
        ),
      ),
    );

    this.callStatusService.callStatus$.pipe(takeUntil(this.ngDestroy$)).subscribe((isCallStarted: boolean) => {
      if (isCallStarted) {
        this.isCallButtonLoading = false;
      }
    });
  }

  public ngOnDestroy(): void {
    this._actionTaken$.complete();
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public onCall(): void {
    if (!this.isCallButtonLoading) {
      this.isCallButtonLoading = true;
      this._actionTaken$.next('makeCall');
    }
  }

  public onNotifyUser(): void {
    if (!this.isNotifyRequestSended) {
      this.isNotifyRequestSended = true;
      this._actionTaken$.next('notifyUser');
    }
  }

  public redirectToPayments(): void {
    this.router.navigate([RouterPaths.dashboard.user.payments.asPath]);
    this._actionTaken$.complete();
  }

  private checkIsFreeConsultation(data: IConsultationFooterData): boolean {
    return data.price !== undefined && data.price.value === 0;
  }
}
