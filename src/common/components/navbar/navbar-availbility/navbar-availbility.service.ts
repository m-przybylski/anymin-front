import {PresenceApi} from 'profitelo-api-ng/api/api'
import {GetExpertVisibility} from 'profitelo-api-ng/model/models'
import {ProfiteloWebsocketService} from '../../../services/profitelo-websocket/profitelo-websocket.service'
import {Subject} from 'rxjs/Subject'
import {Subscription} from 'rxjs/Subscription'

export interface IExpertPresenceUpdate {
  status: GetExpertVisibility.VisibilityEnum
}

export class NavbarAvailbilityService  {

  private readonly changeVisibilityEvent = new Subject<IExpertPresenceUpdate>()

  /* @ngInject */
  constructor(private PresenceApi: PresenceApi,
              profiteloWebsocket: ProfiteloWebsocketService) {

    profiteloWebsocket.onExpertVisibilityUpdate(this.notifyVisibilityChange)
  }

  public getExpertVisibility = (): ng.IPromise<GetExpertVisibility> =>
    this.PresenceApi.expertVisibilityRoute()

  private notifyVisibilityChange = (data: IExpertPresenceUpdate): void => {
    this.changeVisibilityEvent.next(data)
  }

  public onVisibilityChange = (cb: (data: IExpertPresenceUpdate) => void): Subscription =>
    this.changeVisibilityEvent.subscribe(cb)

  public setExpertVisibile = (): ng.IPromise<IExpertPresenceUpdate> =>
    this.PresenceApi.expertVisibleRoute()

  public setExpertInvisibile = (): ng.IPromise<IExpertPresenceUpdate> =>
    this.PresenceApi.expertInvisibleRoute()

}
