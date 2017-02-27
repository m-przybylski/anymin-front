namespace profitelo.api {


  export interface PostTransaction {
      payment: PostPayment;
      nonce: string;
  }

}
