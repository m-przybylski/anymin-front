namespace profitelo.api {


  export interface AccountWithExtras {
      deletedAt?: Date;
      hasMobilePin: boolean;
      email?: string;
      permissions: Array<Permission>;
      countryISO: string;
      msisdn: string;
      apiKey: string;
      registeredAt: Date;
      id: string;
      status: AccountStatus;
      currency: string;
      isCompany: boolean;
      hasPassword: boolean;
      doesMsisdnMatchCountry: boolean;
      isBlocked: boolean;
      protectedViews: Array<string>;
      settings: AccountSettings;
      lastLoggedAt?: Date;
      unverifiedEmail?: string;
  }

}
