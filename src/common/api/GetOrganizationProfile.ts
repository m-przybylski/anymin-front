namespace profitelo.api {


  export interface GetOrganizationProfile {
      profile: GetProfileWithDocuments;
      services: Array<GetOrganizationServiceDetails>;
      isFavourite: boolean;
  }

}
