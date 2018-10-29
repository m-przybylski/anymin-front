import { Component, Inject, OnDestroy } from '@angular/core';
import { Logger } from '@platform/core/logger';
import {
  IFooterOutput,
  CONSULTATION_FOOTER_DATA,
  IConsultationFooterData,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer-helpers';
import { Observable, Subject } from 'rxjs';
import { LoggerFactory, MoneyToAmount } from '@anymind-ng/core';
import { COMMISSION, ICommission } from '@platform/core/commission';
import { ConsultationDetailsActionsService } from '@platform/shared/components/modals/consultation-details/consultation-details-actions.service';

@Component({
  templateUrl: 'consultation-footer-edit.component.html',
  styleUrls: ['consultation-footer-edit.component.sass'],
})
export class ConsultationFooterEditComponent extends Logger implements IFooterOutput, OnDestroy {
  public get actionTaken$(): Observable<keyof ConsultationDetailsActionsService> {
    return this._actionTaken$.asObservable();
  }
  public get grossPrice(): string {
    if (this.data.price === undefined) {
      return '';
    }

    return this.moneyPipe.transform(this.data.price && this.data.price.grossPrice);
  }

  public get price(): string {
    if (this.data.price === undefined) {
      return '';
    }

    return this.moneyPipe.transform(this.data.price && this.data.price.price);
  }

  public get organizationPrice(): string {
    if (this.data.price === undefined) {
      return '';
    }

    return this.moneyPipe.transform({
      amount: this.data.price.price.amount * this.commissionConfig.freelanceConsultationCompanyCommission,
      currency: this.data.price.price.currency,
    });
  }

  public get expertPrice(): string {
    if (this.data.price === undefined) {
      return '';
    }

    return this.moneyPipe.transform({
      amount:
        this.data.price.price.amount *
        (1 -
          (this.commissionConfig.freelanceConsultationCompanyCommission +
            this.commissionConfig.freelanceConsultationAnyMindCommission)),
      currency: this.data.price.price.currency,
    });
  }

  public get isFreelance(): boolean {
    return this.data.isFreelance;
  }

  private _actionTaken$ = new Subject<keyof ConsultationDetailsActionsService>();
  private moneyPipe = new MoneyToAmount(this.loggerService);
  constructor(
    @Inject(CONSULTATION_FOOTER_DATA) public data: IConsultationFooterData,
    @Inject(COMMISSION) private commissionConfig: ICommission,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ConsultationFooterEditComponent'));
  }

  public ngOnDestroy(): void {
    this._actionTaken$.complete();
  }

  public onEdit = (): void => {
    this._actionTaken$.next('editConsultation');
  };

  public onShare = (): void => {
    this._actionTaken$.next('share');
  };
}
