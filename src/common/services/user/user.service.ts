namespace profitelo.services.user {

  import AccountDetails = profitelo.api.AccountDetails
  import ISessionService = profitelo.services.session.ISessionService

  export interface IUserService {
    getUser(): ng.IPromise<AccountDetails>
  }

  class UserService implements IUserService {

    constructor(private sessionService: ISessionService) {}

    public getUser = (): ng.IPromise<AccountDetails> => {
      return this.sessionService.getSession()
        .then((session) => {
          if (session.account) {
            return session.account
          }
          else {
            throw new Error('AccountDetails in session was not defined')
          }
        })
    }
  }

  angular.module('profitelo.services.user', [
    'profitelo.services.session'
  ])
    .service('userService', UserService)
}
