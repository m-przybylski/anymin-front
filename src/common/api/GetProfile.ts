namespace profitelo.api {


  export interface GetProfile {
      id: string;
      isActive: boolean;
      organizationDetails?: OrganizationDetails;
      expertDetails?: ExpertDetails;
  }

}
