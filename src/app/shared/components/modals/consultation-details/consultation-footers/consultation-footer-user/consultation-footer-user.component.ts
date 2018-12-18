import { Component, Inject, OnDestroy } from '@angular/core';
import { Logger } from '@platform/core/logger';
import {
  IFooterOutput,
  CONSULTATION_FOOTER_DATA,
  IConsultationFooterData,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer-helpers';
import { Observable, Subject } from 'rxjs';
import { LoggerFactory, MoneyToAmount } from '@anymind-ng/core';
import { ConsultationDetailsActionsService } from '@platform/shared/components/modals/consultation-details/consultation-details-actions.service';
import { EmploymentWithExpertProfile, GetDefaultPaymentMethod } from '@anymind-ng/api';
import VatRateTypeEnum = EmploymentWithExpertProfile.VatRateTypeEnum;

export enum MiddlePanelStatusTypes {
  freeMinute,
  paymentCard,
  promoCode,
  notAvailable,
}

@Component({
  templateUrl: 'consultation-footer-user.component.html',
  styleUrls: ['consultation-footer-user.component.sass'],
})
export class ConsultationFooterUserComponent extends Logger implements IFooterOutput, OnDestroy {
  public get actionTaken$(): Observable<keyof ConsultationDetailsActionsService> {
    return this._actionTaken$.asObservable();
  }

  public get grossPrice(): string {
    return this.moneyPipe.transform(this.data.price) || this.moneyPipe.transform({ value: 0, currency: '' });
  }

  public get isExpertAvailable(): boolean {
    return this.data.userId === undefined || this.data.isExpertAvailable;
  }

  public get defaultPayment(): GetDefaultPaymentMethod {
    return this.data.defaultPaymentMethod;
  }

  public get middlePanel(): MiddlePanelStatusTypes {
    if (this.data.userId === undefined) {
      return MiddlePanelStatusTypes.freeMinute;
    }

    if (!this.data.isExpertAvailable) {
      return MiddlePanelStatusTypes.notAvailable;
    }

    if (this.data.defaultPaymentMethod.creditCardId === undefined) {
      return MiddlePanelStatusTypes.promoCode;
    }

    return MiddlePanelStatusTypes.paymentCard;
  }

  public middlePanelStatusTypes = MiddlePanelStatusTypes;

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
        this.loggerService.error('Unknow vat rate state');

        return '';
    }
  }

  private _actionTaken$ = new Subject<keyof ConsultationDetailsActionsService>();
  private moneyPipe = new MoneyToAmount(this.loggerService);

  constructor(@Inject(CONSULTATION_FOOTER_DATA) private data: IConsultationFooterData, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('ConsultationFooterUserComponent'));
  }

  public ngOnDestroy(): void {
    this._actionTaken$.complete();
  }

  public onCall = (): void => {
    this._actionTaken$.next('makeCall');
  };

  public onNotifyUser = (): void => {
    this._actionTaken$.next('notifyUser');
  };
}
