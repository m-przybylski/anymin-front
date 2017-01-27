namespace profitelo.models {

  export interface ServiceUsageRequest {
    agentId: string
    service: Service
    expert: Profile
  }
}