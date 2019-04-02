import { GetCreditCard, GetDefaultPaymentMethod } from '@anymind-ng/api';

export interface IPaymentMethod {
  defaultPaymentMethod: GetDefaultPaymentMethod;
  getCreditCard: ReadonlyArray<GetCreditCard>;
}
