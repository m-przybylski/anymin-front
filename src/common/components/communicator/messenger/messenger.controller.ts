import {IMessengerComponentBindings} from './messenger'

export class MessengerComponentController implements ng.IController, IMessengerComponentBindings {
  isMessenger: boolean

  /* @ngInject */
  constructor() {
  }

  public minimizeMessenger = () =>
    this.isMessenger = false

  public maximizeMessenger = () =>
    this.isMessenger = true
}
