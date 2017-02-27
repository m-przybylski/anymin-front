namespace profitelo.api {


  export interface FinancialOperation {
      type: string /*FinancialOperation.TypeEnum*/;
      createdAt: Date;
      accountType: string /*FinancialOperation.AccountTypeEnum*/;
      operation: MoneyDto;
      id: string;
      balanceAfter: MoneyDto;
      persisted?: boolean;
      accountId: string;
  }


  export namespace FinancialOperation {
      export enum TypeEnum {
          SERVICEUSAGECLIENT = <any> 'SERVICE_USAGE_CLIENT',
          PAYMENT = <any> 'PAYMENT',
          REFUNDCLIENT = <any> 'REFUND_CLIENT',
          SERVICEUSAGEEXPERT = <any> 'SERVICE_USAGE_EXPERT',
          PAYOUT = <any> 'PAYOUT',
          REFUNDEXPERT = <any> 'REFUND_EXPERT'
      }
      export enum AccountTypeEnum {
          CLIENT = <any> 'CLIENT',
          PROFILE = <any> 'PROFILE'
      }
  }
}
