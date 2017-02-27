namespace profitelo.api {


  export interface GetServiceUsageRequest {
      profile: GetProfile;
      freeSeconds: number;
      agentId: string;
      service: GetService;
      expert: GetProfile;
      tags: Array<Tag>;
  }

}
