namespace profitelo.api {


  export interface GetServiceUsageDetails {
      ratelCallId: string;
      serviceUsageEventId: string;
      startedAt: Date;
      callDuration: number;
      ratePerMinute: MoneyDto;
      callCost: MoneyDto;
  }

}
