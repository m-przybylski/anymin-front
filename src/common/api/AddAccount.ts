namespace profitelo.api {

  /**
   * AddAccount
   */

  export interface AddAccount {
      telcoPin: string;
      msisdn: string;
      deletedAt: Date;
      email?: string;
      password?: string;
      currency: string;
      status: AccountStatus;
      isCompany: boolean;
      isBlocked: boolean;
      countryISO: string;
  }

}
