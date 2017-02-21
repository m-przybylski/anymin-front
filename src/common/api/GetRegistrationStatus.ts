namespace profitelo.api {


  export interface GetRegistrationStatus {
      status: string /*GetRegistrationStatus.StatusEnum*/;
  }


  export namespace GetRegistrationStatus {
      export enum StatusEnum {
          UNREGISTERED = <any> 'UNREGISTERED',
          VERIFICATIONATTEMPTSEXCEEDED = <any> 'VERIFICATION_ATTEMPTS_EXCEEDED',
          NOPASSWORD = <any> 'NO_PASSWORD',
          REGISTERED = <any> 'REGISTERED',
          BLOCKED = <any> 'BLOCKED'
      }
  }
}
