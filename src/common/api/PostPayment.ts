namespace profitelo.api {


  export interface PostPayment {
      amount?: MoneyDto;
      paymentCountryId: string;
      paymentSystemId: string;
      paymentOption?: MoneyDto;
  }

}
