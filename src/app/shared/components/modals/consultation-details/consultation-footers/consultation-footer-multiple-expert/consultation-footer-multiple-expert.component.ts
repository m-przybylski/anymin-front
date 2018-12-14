import { Component, Inject } from '@angular/core';
import { Logger } from '@platform/core/logger';
import {
  IFooterOutput,
  CONSULTATION_FOOTER_DATA,
  IConsultationFooterData,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer-helpers';
import { Observable, EMPTY } from 'rxjs';
import { LoggerFactory, MoneyToAmount } from '@anymind-ng/core';
import { ConsultationDetailsActionsService } from '@platform/shared/components/modals/consultation-details/consultation-details-actions.service';

@Component({
  templateUrl: 'consultation-footer-multiple-expert.component.html',
  styleUrls: ['consultation-footer-multiple-expert.component.sass'],
})
export class ConsultationFooterMultipleExpertComponent extends Logger implements IFooterOutput {
  public get actionTaken$(): Observable<keyof ConsultationDetailsActionsService> {
    return EMPTY;
  }
  public get grossPrice(): string {
    return (
      this.moneyPipe.transform(this.data.price && this.data.price) ||
      this.moneyPipe.transform({ value: 0, currency: '' })
    );
  }

  private moneyPipe = new MoneyToAmount(this.loggerService);
  constructor(@Inject(CONSULTATION_FOOTER_DATA) public data: IConsultationFooterData, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('ConsultationFooterMultipleExpertComponent'));
  }
}
