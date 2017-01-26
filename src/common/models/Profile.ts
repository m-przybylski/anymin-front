namespace profitelo.models {

  export interface Profile {
    id: string
    isActive: boolean
    organizationDetails?: OrganizationDetails
    expertDetails?: ExpertDetails
  }
}