namespace profitelo.api {


  export interface GetServiceWithEmployments {
      ownerId: string;
      createdAt: Date;
      ownerEmployee: boolean;
      details?: ServiceDetails;
      status: string /*GetServiceWithEmployments.StatusEnum*/;
      invitations: Array<ServiceInvitation>;
      id: string;
      employments: Array<GetEmployment>;
  }


  export namespace GetServiceWithEmployments {
      export enum StatusEnum {
          NEW = <any> 'NEW',
          VERIFIED = <any> 'VERIFIED'
      }
  }
}
