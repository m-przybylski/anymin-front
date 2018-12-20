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

@Component({
  selector: 'plat-consultation-footer-edit',
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

    return this.moneyPipe.transform(this.data.price && this.data.price);
  }

  public get organizationPrice(): string {
    if (this.data.getCommissions.partnerAmount === undefined) {
      return '';
    }

    return this.moneyPipe.transform(this.data.getCommissions.partnerAmount);
  }

  public get expertPrice(): string {
    return this.moneyPipe.transform(this.data.getCommissions.profileAmount);
  }

  public get isFreelance(): boolean {
    return this.data.isFreelance;
  }

  private _actionTaken$ = new Subject<keyof ConsultationDetailsActionsService>();
  private moneyPipe = new MoneyToAmount(this.loggerService);

  constructor(@Inject(CONSULTATION_FOOTER_DATA) public data: IConsultationFooterData, loggerFactory: LoggerFactory) {
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
