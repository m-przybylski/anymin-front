namespace profitelo.api {


  export interface GetEmployment {
      profileId?: string;
      updatedAt: Date;
      email?: string;
      msisdn?: string;
      id: string;
      status: string /*GetEmployment.StatusEnum*/;
      createdAt: Date;
      serviceId: string;
  }


  export namespace GetEmployment {
      export enum StatusEnum {
          NEW = <any> 'NEW',
          ACCEPTED = <any> 'ACCEPTED',
          REJECTED = <any> 'REJECTED'
      }
  }
}
