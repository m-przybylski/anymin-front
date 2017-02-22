namespace profitelo.api {

  /**
   * AddAccount
   */

  export interface AddAccount {
      deletedAt: Date;
      email?: string;
      countryISO: string;
      msisdn: string;
      status: AccountStatus;
      telcoPin: string;
      currency: string;
      isCompany: boolean;
      isBlocked: boolean;
      password?: string;
  }

}
