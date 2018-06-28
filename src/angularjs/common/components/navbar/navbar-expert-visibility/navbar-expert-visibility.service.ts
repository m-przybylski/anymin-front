// tslint:disable:readonly-array
// tslint:disable:no-shadowed-variable
import { PresenceApi } from 'profitelo-api-ng/api/api';
import { GetExpertVisibility, Function1RequestContextFutureRouteResult } from 'profitelo-api-ng/model/models';
import { ProfiteloWebsocketService } from '../../../services/profitelo-websocket/profitelo-websocket.service';
import { Subject, Subscription } from 'rxjs';

export interface IExpertPresenceUpdate {
  status: GetExpertVisibility.VisibilityEnum;
}

// tslint:disable:member-ordering
export class NavbarExpertVisibilityService {

  private readonly requestDelay = 2000;
  private readonly changeVisibilitySubject = new Subject<IExpertPresenceUpdate>();

  public static $inject = ['PresenceApi', '$q', '$timeout', '$window', 'profiteloWebsocket'];

    constructor(private PresenceApi: PresenceApi,
              private $q: ng.IQService,
              private $timeout: ng.ITimeoutService,
              $window: ng.IWindowService,
              profiteloWebsocket: ProfiteloWebsocketService) {

    profiteloWebsocket.onExpertVisibilityUpdate(this.notifyVisibilityChange);

    $window.addEventListener('online', () => {
      this.getExpertVisibility().then((res) => this.notifyVisibilityChange({status: res.visibility}));
    });
  }

 private getExpertVisibilityReconnect = (fn: (res: GetExpertVisibility) => void, delay = 0): void => {
    this.$timeout(() => {
      this.PresenceApi.expertVisibilityRoute().then(fn,
        () => this.getExpertVisibilityReconnect(fn, delay + this.requestDelay));
    }, delay + this.requestDelay);
  }

  public getExpertVisibility = (): ng.IPromise<GetExpertVisibility> => {
    const defer = this.$q.defer<GetExpertVisibility>();

    this.PresenceApi.expertVisibilityRoute().then(
      // tslint:disable-next-line:no-unbound-method
      defer.resolve,
      // tslint:disable-next-line:no-unbound-method
      () => this.getExpertVisibilityReconnect(defer.resolve));

    return defer.promise;
  }

  private notifyVisibilityChange = (data: IExpertPresenceUpdate): void => {
    this.changeVisibilitySubject.next(data);
  }

  public onVisibilityUpdate = (cb: (data: IExpertPresenceUpdate) => void): Subscription =>
    this.changeVisibilitySubject.subscribe(cb)

  public setExpertVisibile = (): ng.IPromise<Function1RequestContextFutureRouteResult> =>
    this.PresenceApi.expertVisibleRoute()

  public setExpertInvisibile = (): ng.IPromise<Function1RequestContextFutureRouteResult> =>
    this.PresenceApi.expertInvisibleRoute()

}
