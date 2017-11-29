import {PresenceApi} from 'profitelo-api-ng/api/api'
import {GetExpertVisibility} from 'profitelo-api-ng/model/models'
import {ProfiteloWebsocketService} from '../../../services/profitelo-websocket/profitelo-websocket.service'
import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory'
import {CallbacksService} from '../../../services/callbacks/callbacks.service'

export interface IExpertPresenceUpdate {
  status: GetExpertVisibility.VisibilityEnum
}

export class NavbarAvailbilityService  {

  private callbacks: CallbacksService
  private static readonly events = {
    onChangeWebsocket: 'onChangeWebsocket'
  }

  /* @ngInject */
  constructor(private PresenceApi: PresenceApi,
              profiteloWebsocket: ProfiteloWebsocketService,
              callbacksFactory: CallbacksFactory) {

    this.callbacks = callbacksFactory.getInstance(Object.keys(NavbarAvailbilityService.events))
    profiteloWebsocket.onExpertVisibilityUpdate(this.setVisibility)
  }

  public getExpertVisibilityRoute = (): ng.IPromise<GetExpertVisibility> =>
    this.PresenceApi.expertVisibilityRoute()

  private setVisibility = (data: IExpertPresenceUpdate): void => {
    this.callbacks.notify(NavbarAvailbilityService.events.onChangeWebsocket, data)
  }

  public onChangeWebsocket = (cb: (data: IExpertPresenceUpdate) => void): void => {
    this.callbacks.methods.onChangeWebsocket(cb)
  }

  public getExpertVisibility = (): ng.IPromise<IExpertPresenceUpdate> =>
    this.PresenceApi.expertVisibleRoute()

  public getExpertInvisibility = (): ng.IPromise<IExpertPresenceUpdate> =>
    this.PresenceApi.expertInvisibleRoute()

}
