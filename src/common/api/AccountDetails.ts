namespace profitelo.api {


  export interface AccountDetails {
      deletedAt?: Date;
      hasMobilePin: boolean;
      email?: string;
      permissions: Array<Permission>;
      countryISO: string;
      msisdn: string;
      registeredAt: number;
      id: string;
      status: AccountStatus;
      currency: string;
      isCompany: boolean;
      hasPassword: boolean;
      doesMsisdnMatchCountry: boolean;
      isBlocked: boolean;
      protectedViews: Array<string>;
      defaultCreditCard?: string;
      settings: AccountSettings;
      unverifiedEmail?: string;
  }

}
