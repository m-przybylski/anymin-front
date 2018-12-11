import { COMMISSION, ICommission } from '../../../core/commission/index';
import { Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe } from '@angular/common';

export class ConsultationPriceComponentService {
  private readonly mathHelper = 100;

  constructor(@Inject(LOCALE_ID) private localeId: string, @Inject(COMMISSION) private commissionConfig: ICommission) {}

  public getPriceAfterAnyMindCommission(value: number, isFreelance: boolean): string {
    const ratio = isFreelance
      ? 1 - this.commissionConfig.freelanceConsultationAnyMindCommission
      : 1 - this.commissionConfig.employeeServiceAnyMindCommission;

    return this.createInputPriceModel(this.getNumberRoundedToTwoDecimals(value * ratio));
  }

  public createInputPriceModel(value: number): string {
    const pipe = new DecimalPipe(this.localeId);
    const transformedValue = pipe.transform(value, '1.2-2');

    return transformedValue !== null ? transformedValue : '';
  }

  public getAnyMindCommission(isFreelance: boolean): string {
    const commission = isFreelance
      ? this.commissionConfig.freelanceConsultationAnyMindCommission
      : this.commissionConfig.employeeServiceAnyMindCommission;

    return `- ${(commission * this.mathHelper).toFixed()}%`;
  }

  public getFreelancerProfit(value: number): string {
    const ratio =
      1 -
      (this.commissionConfig.freelanceConsultationAnyMindCommission +
        this.commissionConfig.freelanceConsultationCompanyCommission);

    return this.createInputPriceModel(this.getNumberRoundedToTwoDecimals(value * ratio));
  }

  private getNumberRoundedToTwoDecimals(value: number): number {
    return Math.round(value * this.mathHelper) / this.mathHelper;
  }
}
