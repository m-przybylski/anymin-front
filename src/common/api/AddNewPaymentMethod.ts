namespace profitelo.api {


  export interface AddNewPaymentMethod {
      nonce: string;
      isDefault: boolean;
      limit?: MoneyDto;
  }

}
