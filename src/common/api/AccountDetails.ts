namespace profitelo.api {


  export interface AccountDetails {
      deletedAt?: Date;
      hasMobilePin: boolean;
      email?: string;
      permissions: Array<Permission>;
      countryISO: string;
      msisdn: string;
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
