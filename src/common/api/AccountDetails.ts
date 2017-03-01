namespace profitelo.api {


  export interface AccountDetails {
      unverifiedEmail?: string;
      permissions: Array<Permission>;
      currency: string;
      settings: AccountSettings;
      status: AccountStatus;
      hasMobilePin: boolean;
      msisdn: string;
      id: string;
      deletedAt?: Date;
      email?: string;
      registeredAt: Date;
      doesMsisdnMatchCountry: boolean;
      protectedViews: Array<string>;
      hasPassword: boolean;
      isBlocked: boolean;
      isCompany: boolean;
      lastLoggedAt?: Date;
      countryISO: string;
  }

}
