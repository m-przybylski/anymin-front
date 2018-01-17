import * as angular from 'angular'
// TODO add account type

export interface IAccount {
  phoneNumber: {
    prefix: string,
    number: string
  },
  password: string
}

export class LoginStateService {

  private account: any = null
  private emptyAccount: any = null

  static $inject = [];

  constructor() {
    this.account = {
      phoneNumber: {
        prefix: null,
        number: null
      },
      password: ''
    }

    this.emptyAccount = angular.copy(this.account)
  }

  public setAccountObject = (account: any): void => {
    this.account = account
  }

  public getAccountObject = (): IAccount => angular.copy(this.account)

  public getFullPhoneNumber = (): string =>
    String(this.account.phoneNumber.prefix) + String(this.account.phoneNumber.number)

  public clearServiceObject = (): void => {
    this.account = angular.copy(this.emptyAccount)
  }
}
