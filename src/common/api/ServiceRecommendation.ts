namespace profitelo.api {


  export interface ServiceRecommendation {
      serviceId?: ServiceId;
      clientId?: AccountId;
      id?: OptionServiceRecommendationId;
      tags?: Array<TagId>;
      persisted?: boolean;
      serviceUsageEventId?: ServiceUsageEventId;
  }

}
