namespace profitelo.api {


  export interface GetServiceUsageRequest {
      agentId: string;
      tags: Array<Tag>;
      service: GetService;
      expert: GetProfile;
      freeSeconds: number;
      profile: GetProfile;
  }

}
