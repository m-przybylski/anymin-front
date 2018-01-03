import {OrganizationDetails} from './OrganizationDetails'
import {Profile} from './Profile'

export interface CompanyProfile extends Profile {
  organizationDetails: OrganizationDetails
}
