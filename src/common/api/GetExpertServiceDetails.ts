namespace profitelo.api {


  export interface GetExpertServiceDetails {
      ownerProfile: GetProfile;
      service: GetService;
      tags: Array<Tag>;
  }

}
