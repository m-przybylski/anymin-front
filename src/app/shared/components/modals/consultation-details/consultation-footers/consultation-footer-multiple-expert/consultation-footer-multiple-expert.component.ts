import { Component, Inject } from '@angular/core';
import { Logger } from '@platform/core/logger';
import {
  IFooterOutput,
  CONSULTATION_FOOTER_DATA,
  IConsultationFooterData,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer-helpers';
import { ConsultationDetailsViewService } from '@platform/shared/components/modals/consultation-details/consultation-details.view.service';
import { Observable, EMPTY } from 'rxjs';
import { LoggerFactory, MoneyToAmount } from '@anymind-ng/core';

@Component({
  templateUrl: 'consultation-footer-multiple-expert.component.html',
  styleUrls: ['consultation-footer-multiple-expert.component.sass'],
})
export class ConsultationFooterMultipleExpertComponent extends Logger implements IFooterOutput {
  public get actionTaken$(): Observable<keyof ConsultationDetailsViewService> {
    return EMPTY;
  }
  public get grossPrice(): string {
    return (
      this.moneyPipe.transform(this.data.price && this.data.price.grossPrice) ||
      this.moneyPipe.transform({ amount: 0, currency: '' })
    );
  }

  private moneyPipe = new MoneyToAmount(this.loggerService);
  constructor(@Inject(CONSULTATION_FOOTER_DATA) public data: IConsultationFooterData, loggerFactory: LoggerFactory) {
    super(loggerFactory);
  }
}
