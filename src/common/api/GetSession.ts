namespace profitelo.api {


  export interface GetSession {
      userAgent?: string;
      country: string;
      account?: AccountDetails;
      city: string;
      apiKey: string;
      ipAddress: string;
      lastActivityAt: Date;
      accountId: string;
      expiresAt: Date;
  }

}
