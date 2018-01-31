import { IMessengerComponentBindings } from './messenger';

export class MessengerComponentController implements ng.IController, IMessengerComponentBindings {
  isMessenger: boolean;

  static $inject = [];

  constructor() {
  }

  public minimizeMessenger = (): boolean =>
    this.isMessenger = false

  public maximizeMessenger = (): boolean =>
    this.isMessenger = true
}
