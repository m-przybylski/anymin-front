namespace profitelo.api {


  export interface GetCallDetails {
      expertProfile: GetProfile;
      service: GetService;
      isRecommended: boolean;
      serviceUsageDetails: GetServiceUsageDetails;
      isRecommendable: boolean;
      serviceOwnerProfile: GetProfile;
      recommendedTags: Array<Tag>;
  }

}
