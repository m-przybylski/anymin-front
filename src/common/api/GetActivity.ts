namespace profitelo.api {


  export interface GetActivity {
      complaint?: string;
      financialOperation: FinancialOperation;
      sueProfileServiceTuple?: GetSUEExpertServiceTuple;
  }

}
