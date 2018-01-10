import * as angular from 'angular'
import {AccountDetails, AccountLogin} from 'profitelo-api-ng/model/models'
import {SessionServiceWrapper} from '../session/session.service'
import {EventsService} from '../events/events.service'
import {GetSession} from 'profitelo-api-ng/model/GetSession';

export class UserService {

    constructor(private sessionServiceWrapper: SessionServiceWrapper, private eventsService: EventsService) {
  }

  public getUser = (purgeCache = false): ng.IPromise<AccountDetails> =>
    this.sessionServiceWrapper.getSession(purgeCache)
      .then((session) => {
        if (session.account) {
          return angular.copy(session.account)
        } else {
          throw new Error('AccountDetails in session was not defined')
        }
      })

  public logout = (): ng.IPromise<void> => this.sessionServiceWrapper.logout().then(() => {
    this.eventsService.emit('logout')
  })

  public login = (loginDetails: AccountLogin): ng.IPromise<GetSession> =>
    this.sessionServiceWrapper.login(loginDetails).then((session) => {
      this.eventsService.emit('login')
      return session
    })
}
