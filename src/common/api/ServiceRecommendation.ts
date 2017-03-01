namespace profitelo.api {


  export interface ServiceRecommendation {
      clientId: string;
      tags: Array<string>;
      persisted?: boolean;
      serviceUsageEventId: string;
      id?: string;
      serviceId: string;
  }

}
