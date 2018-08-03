// tslint:disable:readonly-array
// tslint:disable:newline-before-return
// tslint:disable:no-delete
import { UserSessionService } from '../../../../app/core/services/user-session/user-session.service';
import { Config } from '../../../../config';
import { EventsService } from '../events/events.service';
import { UpgradeService } from '../upgrade/upgrade.service';
import { LoginCredentials } from '@anymind-ng/api';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';

// tslint:disable:member-ordering
export class SessionServiceWrapper {

  public static $inject = ['userSessionService', '$http', 'upgradeService', 'eventsService', '$location'];

  constructor(private userSessionService: UserSessionService,
              private $http: ng.IHttpService,
              private upgradeService: UpgradeService,
              eventsService: EventsService,
              $location: ng.ILocationService) {
    eventsService.on('remote-session-deleted', () => {
      this.upgradeService.toIPromise(this.userSessionService.logout()).finally(() => {
        this.onSuccessLogout();
        eventsService.emit('logout');
        $location.path('/login');
      });
    });
  }

  public logout = (): ng.IPromise<void> =>
    this.upgradeService.toIPromise(this.userSessionService.logout()).then(this.onSuccessLogout)

  public login = (loginDetails: LoginCredentials): ng.IPromise<GetSessionWithAccount> =>
    this.upgradeService.toIPromise(this.userSessionService.login(loginDetails)).then(this.onSuccessLogin)

  public getSession = (force = false): ng.IPromise<GetSessionWithAccount> =>
    this.upgradeService.toIPromise(this.userSessionService.getSession(force)).then(this.onSuccessLogin)

  private onSuccessLogin = (sessionWithAccount: GetSessionWithAccount): GetSessionWithAccount => {
    this.setApiKeyHeader(sessionWithAccount.session.apiKey);
    return sessionWithAccount;
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
