namespace profitelo.api {


  export interface GetCreditCard {
      limit?: MoneyDto;
      token: string;
      cardType: string;
      isDefault: boolean;
      imageUrl: string;
      maskedNumber: string;
      accountId: string;
  }

}
