namespace profitelo.models {

  export interface ClientDashboardCallDetails {
    expertProfile: ExpertProfile
    service: Service
    isRecommended: boolean
    isRecommendable: boolean
    recommendedTags: Array<Tag>
    serviceOwnerProfile: Profile
    serviceUsageDetails: ServiceUsageDetails
  }
}