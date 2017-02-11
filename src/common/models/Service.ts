namespace profitelo.models {

  export interface Service {
    id: string
    ownerId: string
    status: ServiceStatus
    invitations: Array<ServiceInvitation>
    ownerEmployee: boolean
    rating: number
    usageCounter: number
    usageDurationInSeconds: number
    details: ServiceDetails
    createdAt: Date
  }
}
