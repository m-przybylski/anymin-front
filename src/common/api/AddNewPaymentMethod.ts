namespace profitelo.api {


  export interface AddNewPaymentMethod {
      isDefault: boolean;
      limit?: MoneyDto;
      nonce: string;
  }

}
