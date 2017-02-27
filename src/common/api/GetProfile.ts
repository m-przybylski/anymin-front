namespace profitelo.api {


  export interface GetProfile {
      id: string;
      expertDetails?: ExpertDetails;
      isActive: boolean;
      organizationDetails?: OrganizationDetails;
  }

}
