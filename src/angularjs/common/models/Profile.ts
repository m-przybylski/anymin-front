import {Service} from './Service'
import {OrganizationDetails} from './OrganizationDetails'
import {ExpertDetails} from './ExpertDetails'

export interface Profile {
  id: string
  isActive: boolean
  organizationDetails?: OrganizationDetails
  expertDetails?: ExpertDetails
  services: Array<Service>
}
