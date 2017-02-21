namespace profitelo.api {


  export interface CreditCard {
      cardToken?: string;
      maskedNumber?: string;
      default?: boolean;
      imageUrl?: string;
      cardType?: string;
  }

}
