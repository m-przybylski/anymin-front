import { CommonConfig } from '../../../../../common-config';
import { ConfigDEFAULT } from '../../../../../../generated_modules/common-config/common-config.default';
import { IConsultationPriceComponentService } from './consultation-price-component-service.interface';

export class FreelanceConsultationPriceService implements IConsultationPriceComponentService {
  private readonly commonConfig: ConfigDEFAULT = CommonConfig.getCommonConfig();
  private readonly mathRoundHelper = 100;
  private minValidNettPrice: number;
  private grossMaxValidPrice: number;
  private moneyDivider: number;

  constructor(private tax: number, private commission: number) {
    this.minValidNettPrice = this.commonConfig.validation.consultation['price-min'];
    this.grossMaxValidPrice = this.commonConfig.validation.consultation['price-max'];
    this.moneyDivider = this.commonConfig.config.moneyDivider;
  }

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
