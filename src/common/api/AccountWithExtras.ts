namespace profitelo.api {


  export interface AccountWithExtras {
      unverifiedEmail?: string;
      permissions: Array<Permission>;
      currency: string;
      settings: AccountSettings;
      status: AccountStatus;
      hasMobilePin: boolean;
      msisdn: string;
      id: string;
      doesMsisdnMatchCountry: boolean;
      deletedAt?: Date;
      email?: string;
      registeredAt: Date;
      protectedViews: Array<string>;
      apiKey: string;
      hasPassword: boolean;
      isBlocked: boolean;
      isCompany: boolean;
      lastLoggedAt?: Date;
      countryISO: string;
  }

}
