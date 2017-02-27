namespace profitelo.api {


  export interface GetProfileWithServices {
      organizationDetails?: OrganizationDetails;
      services: Array<GetService>;
      expertDetails?: ExpertDetails;
      isActive: boolean;
      id: string;
  }

}
