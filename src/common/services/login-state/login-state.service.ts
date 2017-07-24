import * as angular from 'angular'
// TODO add account type

interface IAccount {
  phoneNumber: {
    prefix: string,
    number: number
  },
  password: string
}

export class LoginStateService {

  private account: any = null
  private emptyAccount: any = null

  /* @ngInject */
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

  public getAccountObject = (): IAccount => {
    return angular.copy(this.account)
  }

  public getFullPhoneNumber = (): string => {
    return String(this.account.phoneNumber.prefix) + String(this.account.phoneNumber.number)
  }

  public clearServiceObject = (): void => {
    this.account = angular.copy(this.emptyAccount)
  }
}
