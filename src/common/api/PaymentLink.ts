namespace profitelo.api {


  export interface PaymentLink {
      value: string;
      name: string;
      brandImageUrl: string;
      status: string /*PaymentLink.StatusEnum*/;
  }


  export namespace PaymentLink {
      export enum StatusEnum {
          ENABLED = <any> 'ENABLED',
          DISABLED = <any> 'DISABLED',
          TEMPORARYDISABLED = <any> 'TEMPORARY_DISABLED'
      }
  }
}
