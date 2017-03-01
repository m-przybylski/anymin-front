namespace profitelo.api {


  export interface GetLastPayment {
      amount: MoneyDto;
      paymentSystemId: string;
      payload?: PostOrder;
  }

}
