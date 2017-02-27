namespace profitelo.api {


  export interface PostRecoverPassword {
      method?: string /*PostRecoverPassword.MethodEnum*/;
      msisdn: string;
  }


  export namespace PostRecoverPassword {
      export enum MethodEnum {
          EMAIL = <any> 'EMAIL',
          SMS = <any> 'SMS'
      }
  }
}
