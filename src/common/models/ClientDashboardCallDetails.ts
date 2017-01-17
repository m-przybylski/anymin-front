interface ClientDashboardCallDetails {
  expertProfile: Profile
  service: Service
  isRecommended: boolean
  isRecommendable: boolean
  recommendedTags: Array<Tag>
  serviceOwnerProfile: Profile
  serviceUsageDetails: ServiceUsageDetails
}