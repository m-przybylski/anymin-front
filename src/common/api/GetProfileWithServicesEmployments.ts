namespace profitelo.api {


  export interface GetProfileWithServicesEmployments {
      services: Array<GetServiceWithEmployments>;
      organizationDetails?: OrganizationDetails;
      expertDetails?: ExpertDetails;
      id: string;
      isActive: boolean;
  }

}
