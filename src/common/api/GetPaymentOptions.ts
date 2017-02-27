namespace profitelo.api {


  export interface GetPaymentOptions {
      minimalPayment: MoneyDto;
      paymentOptions: Array<MoneyDto>;
      lastPayment?: GetLastPayment;
      id: string;
      countryISO: string;
      paymentSystems: Array<PaymentSystem>;
  }

}
