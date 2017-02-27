namespace profitelo.api {


  export interface GetService {
      ownerEmployee: boolean;
      usageCounter: number;
      id: string;
      invitations: Array<ServiceInvitation>;
      ownerId: string;
      createdAt: number;
      status: string /*GetService.StatusEnum*/;
      usageDurationInSeconds: number;
      details?: ServiceDetails;
      rating: number;
  }


  export namespace GetService {
      export enum StatusEnum {
          NEW = <any> 'NEW',
          VERIFIED = <any> 'VERIFIED'
      }
  }
}
