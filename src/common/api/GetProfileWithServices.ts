namespace profitelo.api {


  export interface GetProfileWithServices {
      services: Array<GetService>;
      organizationDetails?: OrganizationDetails;
      expertDetails?: ExpertDetails;
      id: string;
      isActive: boolean;
  }

}
