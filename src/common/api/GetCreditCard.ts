namespace profitelo.api {


  export interface GetCreditCard {
      maskedNumber: string;
      accountId: string;
      token: string;
      imageUrl: string;
      limit?: MoneyDto;
      cardType: string;
      isDefault: boolean;
  }

}
