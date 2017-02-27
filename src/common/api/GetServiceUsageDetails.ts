namespace profitelo.api {


  export interface GetServiceUsageDetails {
      callDuration: number;
      ratelCallId: string;
      ratePerMinute: MoneyDto;
      callCost: MoneyDto;
      startedAt: Date;
      serviceUsageEventId: string;
  }

}
