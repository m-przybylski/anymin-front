namespace profitelo.api {


  export interface GetProfileWithDocuments {
      id: string;
      expertDetails?: GetExpertDetails;
      isActive: boolean;
      organizationDetails?: GetOrganizationDetails;
  }

}
