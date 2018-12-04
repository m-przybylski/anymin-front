import { InjectionToken, Provider } from '@angular/core';
import { Config } from '../../../config';

export const COMMISSION: InjectionToken<ICommission> = new InjectionToken('Commission injection token');

export interface ICommission {
  freelanceConsultationAnyMindCommission: number;
  freelanceConsultationCompanyCommission: number;
  employeeServiceAnyMindCommission: number;
  percentDivider: number;
  numberPrecision: number;
  moneyDivider: number;
}

// tslint:disable-next-line:only-arrow-functions
export function provideCommission(): Provider {
  return {
    provide: COMMISSION,
    useValue: {
      freelanceConsultationAnyMindCommission: 0.07,
      freelanceConsultationCompanyCommission: 0.1,
      employeeServiceAnyMindCommission: 0,
      percentDivider: 100,
      numberPrecision: 2,
      moneyDivider: Config.moneyDivider,
    },
  };
}
