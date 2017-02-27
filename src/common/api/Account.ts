namespace profitelo.api {


  export interface Account {
      unverifiedEmail?: string;
      currency: string;
      settings: AccountSettings;
      status: boolean;
      hasMobilePin: boolean;
      msisdn: string;
      id: string;
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
