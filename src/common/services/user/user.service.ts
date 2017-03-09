import {AccountDetails} from "../../api/model/AccountDetails"
import {SessionService} from "../session/session.service"

export class UserService {

  /* @ngInject */
  constructor(private sessionService: SessionService) {
  }

  public getUser = (purgeCache = false): ng.IPromise<AccountDetails> => {
    return this.sessionService.getSession(purgeCache)
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
