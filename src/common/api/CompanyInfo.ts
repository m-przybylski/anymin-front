namespace profitelo.api {


  export interface CompanyInfo {
      vat: number;
      accountId: string;
      id: string;
      companyName: string;
      vatNumber: string;
      createdAt: Date;
      address: Address;
  }

}
