namespace profitelo.api {


  export interface GetLastPayment {
      paymentSystemId: string;
      payload?: PostOrder;
      amount: MoneyDto;
  }

}
