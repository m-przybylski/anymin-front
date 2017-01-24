module profitelo.models {

  export interface ServiceUsageDetails {
    serviceUsageEventId: string,
    ratelCallId: string,
    startedAt: Date,
    ratePerMinute: Money,
    callCost: Money,
    callDuration: number
  }
}