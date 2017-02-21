namespace profitelo.api {


  export interface PaymentMethods {
      creditCards?: Array<CreditCard>;
      payPalAccounts?: Array<PayPalAccount>;
  }

}
