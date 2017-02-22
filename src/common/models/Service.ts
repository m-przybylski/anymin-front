namespace profitelo.models {

  export interface Service {
    id: string
    ownerId: string
    status: string
    invitations: Array<ServiceInvitation>
    ownerEmployee: boolean
    rating: number
    usageCounter: number
    usageDurationInSeconds: number
    details: ServiceDetails
    createdAt: Date
  }
}
