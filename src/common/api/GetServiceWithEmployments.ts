namespace profitelo.api {


  export interface GetServiceWithEmployments {
      employments: Array<GetEmployment>;
      id: string;
      invitations: Array<ServiceInvitation>;
      status: string /*GetServiceWithEmployments.StatusEnum*/;
      createdAt: Date;
      ownerId: string;
      details?: ServiceDetails;
      ownerEmployee: boolean;
  }


  export namespace GetServiceWithEmployments {
      export enum StatusEnum {
          NEW = <any> 'NEW',
          VERIFIED = <any> 'VERIFIED'
      }
  }
}
