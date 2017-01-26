namespace profitelo.services.loginState {

  //TODO add account type
  export interface ILoginStateService {
    setAccountObject(account: any): void
    getAccountObject(): any
    getFullPhoneNumber(): string
    clearServiceObject(): void
  }

  class LoginStateService implements ILoginStateService {

    private account: any = null
    private emptyAccount: any = null

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

    public setAccountObject = (account) => {
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

  angular.module('profitelo.services.login-state', [])
  .service('loginStateService', LoginStateService)
}