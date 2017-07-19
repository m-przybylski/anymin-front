import * as angular from 'angular'
// TODO add account type
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

  public setAccountObject = (account: any) => {
    this.account = account
  }

  public getAccountObject = () => {
    return angular.copy(this.account)
  }

  public getFullPhoneNumber = () => {
    return String(this.account.phoneNumber.prefix) + String(this.account.phoneNumber.number)
  }

  public clearServiceObject = () => {
    this.account = angular.copy(this.emptyAccount)
  }
}
