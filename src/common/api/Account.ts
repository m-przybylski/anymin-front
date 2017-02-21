namespace profitelo.api {


  export interface Account {
      deletedAt?: Date;
      hasMobilePin: boolean;
      email?: string;
      countryISO: string;
      msisdn: string;
      apiKey: string;
      registeredAt: Date;
      id: string;
      status: boolean;
      currency: string;
      isCompany: boolean;
      hasPassword: boolean;
      isBlocked: boolean;
      protectedViews: Array<string>;
      settings: AccountSettings;
      lastLoggedAt?: Date;
      unverifiedEmail?: string;
  }

}
