namespace profitelo.api {


  export interface GetOrganizationProfile {
      profile: GetProfileWithDocuments;
      isFavourite: boolean;
      services: Array<GetOrganizationServiceDetails>;
  }

}
