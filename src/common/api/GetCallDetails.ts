namespace profitelo.api {


  export interface GetCallDetails {
      recommendedTags: Array<Tag>;
      serviceOwnerProfile: GetProfile;
      isRecommendable: boolean;
      isRecommended: boolean;
      service: GetService;
      serviceUsageDetails: GetServiceUsageDetails;
      expertProfile: GetProfile;
  }

}
