namespace profitelo.api {


  export interface GetExpertProfile {
      profile: GetProfileWithDocuments;
      services: Array<GetExpertServiceDetails>;
      employers: Array<GetProfileDetails>;
      isFavourite: boolean;
  }

}
