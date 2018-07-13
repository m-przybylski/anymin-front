import { CommonConfig } from '../../../../common-config';
import { ConfigDEFAULT } from '../../../../../generated_modules/common-config/common-config.default';

export class ConsultationPriceComponentService {

  private readonly commonConfig: ConfigDEFAULT = CommonConfig.getCommonConfig();
  private minValidPriceWithoutCommission: number;
  private grossMaxValidPrice: number;
  private moneyDivider: number;
  private mathRoundHelper = 100;

  constructor() {
    this.minValidPriceWithoutCommission = this.commonConfig.validation.consultation['price-min'];
    this.grossMaxValidPrice = this.commonConfig.validation.consultation['price-max'];
    this.moneyDivider = this.commonConfig.config.moneyDivider;
  }

  public getPriceWithoutCommission = (value: number, commission: number, tax: number): number => {
    const netPrice = value - (value * tax) / (tax + 1);
    const netPriceWithoutCommission = (netPrice - (netPrice * commission) / (commission + 1));

    return this.getValueRoundedToTwoDecimals(netPriceWithoutCommission);
  }

  public getMaxValidPriceWithoutCommission = (commission: number, tax: number): number => {
    const netPrice = this.grossMaxValidPrice - (this.grossMaxValidPrice * tax) / (tax + 1);
    const netPriceWithoutCommission = (netPrice - (netPrice * commission) / (commission + 1));

    return Math.round(netPriceWithoutCommission);
  }

  public getMinGrossValidPrice = (commission: number, tax: number): number => {
    const minGrossValidPrice =
      ((this.minValidPriceWithoutCommission * (commission + 1)) * (tax + 1));

    return Math.round(minGrossValidPrice);
  }

  public getNetPrice = (value: number, commission: number): number =>
    Math.round((value * this.moneyDivider) * (commission + 1))

  public getGrossPrice = (value: number, commission: number, tax: number): number => {
    const netPrice = value * (commission + 1);
    const grossPrice = (netPrice * (tax + 1));

    return this.getValueRoundedToTwoDecimals(grossPrice);
  }

  private getValueRoundedToTwoDecimals = (value: number): number =>
    Math.round(value * this.mathRoundHelper) / this.mathRoundHelper

}
