namespace profitelo.models {

  export interface OrganizationDetails {
    name: string
    logo?: string
    description: string
    files: Array<any>
    links: Array<string>
  }
}