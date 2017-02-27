namespace profitelo.api {


  export interface GetProfileWithServicesEmployments {
      organizationDetails?: OrganizationDetails;
      services: Array<GetServiceWithEmployments>;
      expertDetails?: ExpertDetails;
      isActive: boolean;
      id: string;
  }

}
