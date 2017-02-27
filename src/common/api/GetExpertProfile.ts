namespace profitelo.api {


  export interface GetExpertProfile {
      profile: GetProfileWithDocuments;
      employers: Array<GetProfileDetails>;
      isFavourite: boolean;
      services: Array<GetExpertServiceDetails>;
  }

}
