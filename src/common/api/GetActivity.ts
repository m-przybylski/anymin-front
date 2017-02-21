namespace profitelo.api {


  export interface GetActivity {
      financialOperation: FinancialOperation;
      sueProfileServiceTuple?: GetSUEExpertServiceTuple;
      complaint?: string;
  }

}
