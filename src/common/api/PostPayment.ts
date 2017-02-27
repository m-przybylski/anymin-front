namespace profitelo.api {


  export interface PostPayment {
      paymentSystemId: string;
      paymentOption?: MoneyDto;
      paymentCountryId: string;
      amount?: MoneyDto;
  }

}
