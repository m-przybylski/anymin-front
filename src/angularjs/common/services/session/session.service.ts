import { UserSessionService } from '../../../../angular/core/services/user-session/user-session.service';
import { Config } from '../../../../config';
import { GetSession, LoginCredentials } from 'profitelo-api-ng/model/models';
import { EventsService } from '../events/events.service';
import { UpgradeService } from '../upgrade/upgrade.service';
import { StateService } from '@uirouter/angularjs';

// tslint:disable:member-ordering
export class SessionServiceWrapper {

  public static $inject = ['userSessionService', '$http', 'upgradeService', 'eventsService', '$state'];

  constructor(private userSessionService: UserSessionService,
              private $http: ng.IHttpService,
              private upgradeService: UpgradeService,
              eventsService: EventsService,
              $state: StateService) {
    eventsService.on('remote-session-deleted', () => {
      this.upgradeService.toIPromise(this.userSessionService.logout()).finally(() => {
        this.onSuccessLogout();
        eventsService.emit('logout');
        $state.reload();
      });
    });
  }

  public logout = (): ng.IPromise<void> =>
    this.upgradeService.toIPromise(this.userSessionService.logout()).then(this.onSuccessLogout)

  public login = (loginDetails: LoginCredentials): ng.IPromise<GetSession> =>
    this.upgradeService.toIPromise(this.userSessionService.login(loginDetails)).then(this.onSuccessLogin)

  public getSession = (force = false): ng.IPromise<GetSession> =>
    this.upgradeService.toIPromise(this.userSessionService.getSession(force)).then(this.onSuccessLogin)

  private onSuccessLogin = (session: GetSession): GetSession => {
    this.setApiKeyHeader(session.apiKey);
    return session;
  }

  private onSuccessLogout = (): void => {
    // tslint:disable-next-line:no-non-null-assertion
    delete this.$http.defaults.headers!.common[Config.http.apiHeader];
  }

  private setApiKeyHeader = (apiKey: string): void => {
    // tslint:disable-next-line:no-non-null-assertion
    this.$http.defaults.headers!.common[Config.http.apiHeader] = apiKey;
  }
}
