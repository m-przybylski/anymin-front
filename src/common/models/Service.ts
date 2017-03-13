import {ServiceDetails} from "../api/model/ServiceDetails"
import {ServiceInvitation} from "../api/model/ServiceInvitation"

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
