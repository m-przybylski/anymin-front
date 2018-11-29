import { IConsultationPriceComponentService } from './consultation-price-component-service.interface';
import { Config } from '../../../../../config';

export class FreelanceConsultationPriceService implements IConsultationPriceComponentService {
  private readonly mathRoundHelper = 100;
  private minValidNettPrice = 100;
  private grossMaxValidPrice = 9900;
  private moneyDivider = Config.moneyDivider;

  constructor(private tax: number, private commission: number) {}

  public getPriceWithoutCommission = (value: number): number => {
    const netPrice = value - (value * this.tax) / (this.tax + 1);
    const withoutCommissionPercent = 1 - this.commission;
    const netPriceWithoutCommission = netPrice * withoutCommissionPercent;

    return this.getValueRoundedToTwoDecimals(netPriceWithoutCommission);
  };

  public getMinValidPriceWithoutCommission = (): number => {
    const withoutCommissionPercent = 1 - this.commission;

    return Math.round(this.minValidNettPrice * withoutCommissionPercent);
  };

  public getMaxValidPriceWithoutCommission = (): number => {
    const withoutCommissionPercent = 1 - this.commission;
    const maxNettPrice = this.grossMaxValidPrice - (this.grossMaxValidPrice * this.tax) / (this.tax + 1);
    const maxValidPriceWithoutCommission = maxNettPrice * withoutCommissionPercent;

    return Math.round(maxValidPriceWithoutCommission);
  };

  public getMinGrossValidPrice = (): number => {
    const minGrossValidPrice = this.minValidNettPrice * (this.tax + 1);

    return Math.round(minGrossValidPrice);
  };

  public getNettPrice = (value: number): number => {
    const withoutCommissionPercent = 1 - this.commission;
    const nett = (value * this.moneyDivider) / withoutCommissionPercent;

    return Math.round(nett);
  };

  public getGrossPrice = (value: number): number => {
    const withoutCommissionPercent = 1 - this.commission;
    const grossPrice = (value / withoutCommissionPercent) * (this.tax + 1);

    return this.getValueRoundedToTwoDecimals(grossPrice);
  };

  private getValueRoundedToTwoDecimals = (value: number): number =>
    Math.round(value * this.mathRoundHelper) / this.mathRoundHelper;
}
