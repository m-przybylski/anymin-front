namespace profitelo.api {


  export interface PostOrder {
      email: string;
      continueUrl?: string;
      lastName: string;
      payment: PostPayment;
      firstName: string;
      payMethodValue: string;
  }

}
