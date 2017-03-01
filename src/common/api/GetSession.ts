namespace profitelo.api {


  export interface GetSession {
      city: string;
      country: string;
      accountId: string;
      userAgent?: string;
      apiKey: string;
      lastActivityAt: number;
      ipAddress: string;
      account?: AccountDetails;
      isExpired: boolean;
  }

}
