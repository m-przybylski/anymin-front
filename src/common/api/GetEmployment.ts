namespace profitelo.api {


  export interface GetEmployment {
      serviceId: string;
      msisdn?: string;
      createdAt: Date;
      profileId?: string;
      id: string;
      updatedAt: Date;
      status: string /*GetEmployment.StatusEnum*/;
      email?: string;
  }


  export namespace GetEmployment {
      export enum StatusEnum {
          NEW = <any> 'NEW',
          ACCEPTED = <any> 'ACCEPTED',
          REJECTED = <any> 'REJECTED'
      }
  }
}
