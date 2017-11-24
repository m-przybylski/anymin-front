import {PresenceApi} from 'profitelo-api-ng/api/api'
import {GetExpertVisibility} from 'profitelo-api-ng/model/models'
import {ProfiteloWebsocketService} from '../../../services/profitelo-websocket/profitelo-websocket.service'
import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory'
import {CallbacksService} from '../../../services/callbacks/callbacks.service'
import {IWebSocketChange} from './navbar-availbility.controller'
import {ErrorHandlerService} from '../../../services/error-handler/error-handler.service'

export class NavbarAvailbilityComponentService  {

  private callbacks: CallbacksService

  private static readonly events = {
    onChangeWebsocket: 'onChangeWebsocket'
  }

  /* @ngInject */
  constructor(private PresenceApi: PresenceApi,
              private errorHandler: ErrorHandlerService,
              profiteloWebsocket: ProfiteloWebsocketService,
              callbacksFactory: CallbacksFactory) {

    this.callbacks = callbacksFactory.getInstance(Object.keys(NavbarAvailbilityComponentService.events))
    profiteloWebsocket.onExpertVisibilityUpdate(this.setVisibility)
  }

  public getExpertVisibilityRoute = (): ng.IPromise<GetExpertVisibility> =>
    this.PresenceApi.expertVisibilityRoute()

  private setVisibility = (data: IWebSocketChange): void => {
    this.callbacks.notify(NavbarAvailbilityComponentService.events.onChangeWebsocket, data)
  }

  public onChangeWebsocket = (cb: (data: IWebSocketChange) => void): void => {
    this.callbacks.methods.onChangeWebsocket(cb)
  }

  public setExpertPresenceVisible = (): void => {
    this.PresenceApi.expertVisibleRoute().catch(error =>
      this.errorHandler.handleServerError(error)
    )
  }

  public setExpertPresenceInvisible = (): void => {
    this.PresenceApi.expertInvisibleRoute().catch(error =>
      this.errorHandler.handleServerError(error)
    )
  }
}
