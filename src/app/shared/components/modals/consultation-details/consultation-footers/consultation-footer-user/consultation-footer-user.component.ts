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

export enum MiddlePanelStatusTypes {
  freeMinute,
  paymentCard,
  paymentAnyMind,
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
    return (
      this.moneyPipe.transform(this.data.price && this.data.price.grossPrice) ||
      this.moneyPipe.transform({ amount: 0, currency: '' })
    );
  }

  public get isExpertAvailable(): boolean {
    return this.data.userId === undefined || this.data.isExpertAvailable;
  }

  public get balance(): string {
    return this.moneyPipe.transform(this.data.accountBalance);
  }

  public get duration(): number {
    const grossPrice = (this.data.price && this.data.price.grossPrice.amount) || 0;
    if (grossPrice === 0) {
      return 0;
    }

    return Math.round(this.data.accountBalance.amount / grossPrice);
  }

  public get middlePanel(): MiddlePanelStatusTypes {
    if (this.data.userId === undefined) {
      return MiddlePanelStatusTypes.freeMinute;
    }

    if (!this.data.isExpertAvailable) {
      return MiddlePanelStatusTypes.notAvailable;
    }

    if (this.data.defaultPayment.card === undefined) {
      return MiddlePanelStatusTypes.paymentAnyMind;
    }

    return MiddlePanelStatusTypes.paymentCard;
  }

  public middlePanelStatusTypes = MiddlePanelStatusTypes;
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
