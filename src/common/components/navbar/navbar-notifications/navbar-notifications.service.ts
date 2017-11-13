import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory'
import {CallbacksService} from '../../../services/callbacks/callbacks.service'
export class NavbarNotificationsService {

  private callbacks: CallbacksService

  private static readonly events = {
    onInvitationsResolved: 'onInvitationsResolved'
  }

  /* @ngInject */
  constructor(callbacksFactory: CallbacksFactory) {
    this.callbacks = callbacksFactory.getInstance(Object.keys(NavbarNotificationsService.events))
  }

  public onInvitationsResolved = (onFetchInvitations: () => void): void => {
    this.callbacks.methods.onInvitationsResolved(onFetchInvitations)
  }

  public resolveInvitations = (): void => {
    this.callbacks.notify(NavbarNotificationsService.events.onInvitationsResolved)
  }
}
