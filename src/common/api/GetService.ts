namespace profitelo.api {


  export interface GetService {
      usageCounter: number;
      id: string;
      usageDurationInSeconds: number;
      invitations: Array<ServiceInvitation>;
      rating: number;
      status: string /*GetService.StatusEnum*/;
      createdAt: number;
      ownerId: string;
      details?: ServiceDetails;
      ownerEmployee: boolean;
  }


  export namespace GetService {
      export enum StatusEnum {
          NEW = <any> 'NEW',
          VERIFIED = <any> 'VERIFIED'
      }
  }
}
