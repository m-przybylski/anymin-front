namespace profitelo.api {


  export interface GetProfileWithDocuments {
      id: string;
      isActive: boolean;
      organizationDetails?: GetOrganizationDetails;
      expertDetails?: GetExpertDetails;
  }

}
