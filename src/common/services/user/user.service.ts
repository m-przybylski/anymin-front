import * as angular from 'angular'
import {AccountDetails, AccountLogin} from 'profitelo-api-ng/model/models'
import {SessionService} from '../session/session.service'
import {EventsService} from '../events/events.service'
import {GetSession} from 'profitelo-api-ng/model/GetSession';

export class UserService {

  /* @ngInject */
  constructor(private sessionService: SessionService, private eventsService: EventsService) {
  }

  public getUser = (purgeCache = false): ng.IPromise<AccountDetails> =>
    this.sessionService.getSession(purgeCache)
      .then((session) => {
        if (session.account) {
          return angular.copy(session.account)
        } else {
          throw new Error('AccountDetails in session was not defined')
        }
      })

  public logout = (): ng.IPromise<void> => this.sessionService.logout().then(() => {
      this.eventsService.emit('logout')
    })

  public login = (loginDetails: AccountLogin): ng.IPromise<GetSession> =>
    this.sessionService.login(loginDetails).then((session) => {
      this.eventsService.emit('login')
      return session
    })
}
