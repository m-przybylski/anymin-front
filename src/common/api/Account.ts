namespace profitelo.api {


  export interface Account {
      isBlocked: boolean;
      msisdn: string;
      lastLoggedAt?: Date;
      unverifiedEmail?: string;
      id: string;
      protectedViews: Array<string>;
      deletedAt?: Date;
      email?: string;
      registeredAt: Date;
      currency: string;
      settings: AccountSettings;
      hasPassword: boolean;
      status: boolean;
      isCompany: boolean;
      hasMobilePin: boolean;
      countryISO: string;
  }

}
