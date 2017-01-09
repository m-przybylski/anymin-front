interface Service {
  id: string
  ownerId: string
  status: ServiceStatus
  invitations: Array<ServiceInvitation>
  ownerEmployee: boolean
  rating: Number
  usageCounter: Number
  usageDurationInSeconds: Number
  details?: ServiceDetails
  createdAt: Date
}