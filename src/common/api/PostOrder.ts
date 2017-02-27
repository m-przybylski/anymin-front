namespace profitelo.api {


  export interface PostOrder {
      firstName: string;
      continueUrl?: string;
      payMethodValue: string;
      payment: PostPayment;
      lastName: string;
      email: string;
  }

}
