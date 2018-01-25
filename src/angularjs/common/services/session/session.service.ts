import {UserSessionService} from '../../../../angular/core/services/user-session/user-session.service';
import {Config} from '../../../../config';
import {GetSession, AccountLogin} from 'profitelo-api-ng/model/models'
import {EventsService} from '../events/events.service'
import {UpgradeService} from '../upgrade/upgrade.service';

export class SessionServiceWrapper {

  static $inject = ['userSessionService', '$http', 'upgradeService', 'eventsService'];

  constructor(private userSessionService: UserSessionService,
              private $http: ng.IHttpService,
              private upgradeService: UpgradeService,
              eventsService: EventsService) {
    eventsService.on('remote-session-deleted', () => {
      this.userSessionService.logout()
      this.onSuccessLogout()
      eventsService.emit('logout')
    })
  }

  public logout = (): ng.IPromise<void> =>
    this.upgradeService.toIPromise(this.userSessionService.logout()).then(this.onSuccessLogout)

  public login = (loginDetails: AccountLogin): ng.IPromise<GetSession> =>
    this.upgradeService.toIPromise(this.userSessionService.login(loginDetails)).then(this.onSuccessLogin)

  public getSession = (force: boolean = false): ng.IPromise<GetSession> =>
    this.upgradeService.toIPromise(this.userSessionService.getSession(force)).then(this.onSuccessLogin)

  private onSuccessLogin = (session: GetSession): GetSession => {
    this.setApiKeyHeader(session.apiKey)
    return session
  }

  private onSuccessLogout = (): void => {
    delete this.$http.defaults.headers!.common[Config.http.apiHeader]
  }

  private setApiKeyHeader = (apiKey: string): void => {
    this.$http.defaults.headers!.common[Config.http.apiHeader] = apiKey
  }
}
