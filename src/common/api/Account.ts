namespace profitelo.api {


  export interface Account {
      deletedAt?: string;
      hasMobilePin: boolean;
      email?: string;
      countryISO: string;
      msisdn: string;
      registeredAt: number;
      id: string;
      status: AccountStatus;
      currency: string;
      isCompany: boolean;
      hasPassword: boolean;
      isBlocked: boolean;
      protectedViews: Array<string>;
      defaultCreditCard?: string;
      settings: AccountSettings;
      unverifiedEmail?: string;
  }

}
