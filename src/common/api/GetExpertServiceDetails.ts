namespace profitelo.api {


  export interface GetExpertServiceDetails {
      service: GetService;
      ownerProfile: GetProfile;
      tags: Array<Tag>;
  }

}
