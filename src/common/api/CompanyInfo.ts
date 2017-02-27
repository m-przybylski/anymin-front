namespace profitelo.api {


  export interface CompanyInfo {
      companyName: string;
      createdAt: Date;
      address: Address;
      id: string;
      vatNumber: string;
      accountId: string;
      vat: number;
  }

}
