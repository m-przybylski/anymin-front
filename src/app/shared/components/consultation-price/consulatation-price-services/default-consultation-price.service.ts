import { IConsultationPriceComponentService } from './consultation-price-component-service.interface';

export class DefaultConsultationPriceService implements IConsultationPriceComponentService {

  private readonly mathRoundHelper = 100;
  private minValidNettPrice = 100;
  private grossMaxValidPrice = 9900;
  private moneyDivider = 100;

  constructor(private tax: number,
              private commission: number) {
  }

  public getPriceWithoutCommission = (value: number): number => {
    const netPrice = value - (value * this.tax) / (this.tax + 1);
    const netPriceWithoutCommission = (netPrice - (netPrice * this.commission) / (this.commission + 1));

    return this.getValueRoundedToTwoDecimals(netPriceWithoutCommission);
  }

  public getMinValidPriceWithoutCommission = (): number => {
    const minValidNettPrice =
      (this.minValidNettPrice - (this.minValidNettPrice * this.commission) / (this.commission + 1));

    return Math.round(minValidNettPrice);
  }

  public getMaxValidPriceWithoutCommission = (): number => {
    const netPrice = this.grossMaxValidPrice - (this.grossMaxValidPrice * this.tax) / (this.tax + 1);
    const netPriceWithoutCommission = (netPrice - (netPrice * this.commission) / (this.commission + 1));

    return Math.round(netPriceWithoutCommission);
  }

  public getMinGrossValidPrice = (): number => {
    const minGrossValidPrice = (this.minValidNettPrice * (this.tax + 1));

    return Math.round(minGrossValidPrice);
  }

  public getNettPrice = (value: number): number =>
    Math.round((value * this.moneyDivider) * (this.commission + 1))

  public getGrossPrice = (value: number): number => {
    const netPrice = value * (this.commission + 1);
    const grossPrice = (netPrice * (this.tax + 1));

    return this.getValueRoundedToTwoDecimals(grossPrice);
  }

  private getValueRoundedToTwoDecimals = (value: number): number =>
    Math.round(value * this.mathRoundHelper) / this.mathRoundHelper

}
