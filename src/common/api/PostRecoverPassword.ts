namespace profitelo.api {


  export interface PostRecoverPassword {
      msisdn: string;
      method?: string /*PostRecoverPassword.MethodEnum*/;
  }


  export namespace PostRecoverPassword {
      export enum MethodEnum {
          EMAIL = <any> 'EMAIL',
          SMS = <any> 'SMS'
      }
  }
}
