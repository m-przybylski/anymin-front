namespace profitelo.models {

  export interface CallSummary {
    accountId: string
    serviceUsageEventId: string
    companyExpertProfile: ExpertProfile
    service: Service
  }
}
