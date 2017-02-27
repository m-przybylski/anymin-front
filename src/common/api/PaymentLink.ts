namespace profitelo.api {


  export interface PaymentLink {
      value: string;
      status: string /*PaymentLink.StatusEnum*/;
      name: string;
      brandImageUrl: string;
  }


  export namespace PaymentLink {
      export enum StatusEnum {
          ENABLED = <any> 'ENABLED',
          DISABLED = <any> 'DISABLED',
          TEMPORARYDISABLED = <any> 'TEMPORARY_DISABLED'
      }
  }
}
