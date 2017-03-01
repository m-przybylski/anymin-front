namespace profitelo.api {


  export interface FinancialOperation {
      balanceAfter: MoneyDto;
      accountId: string;
      persisted?: boolean;
      id: string;
      operation: MoneyDto;
      accountType: string /*FinancialOperation.AccountTypeEnum*/;
      createdAt: Date;
      type: string /*FinancialOperation.TypeEnum*/;
  }


  export namespace FinancialOperation {
      export enum AccountTypeEnum {
          CLIENT = <any> 'CLIENT',
          PROFILE = <any> 'PROFILE'
      }
      export enum TypeEnum {
          SERVICEUSAGECLIENT = <any> 'SERVICE_USAGE_CLIENT',
          PAYMENT = <any> 'PAYMENT',
          REFUNDCLIENT = <any> 'REFUND_CLIENT',
          SERVICEUSAGEEXPERT = <any> 'SERVICE_USAGE_EXPERT',
          PAYOUT = <any> 'PAYOUT',
          REFUNDEXPERT = <any> 'REFUND_EXPERT'
      }
  }
}
