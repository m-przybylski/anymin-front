namespace profitelo.api {


  export interface GetPaymentOptions {
      paymentSystems: Array<PaymentSystem>;
      lastPayment?: GetLastPayment;
      paymentOptions: Array<MoneyDto>;
      countryISO: string;
      id: string;
      minimalPayment: MoneyDto;
  }

}
