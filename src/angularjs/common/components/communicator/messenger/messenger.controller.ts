// tslint:disable:no-empty
import { IMessengerComponentBindings } from './messenger';

// tslint:disable:member-ordering
export class MessengerComponentController implements ng.IController, IMessengerComponentBindings {
  public isMessenger: boolean;

  public static $inject = [];

  constructor() {
  }

  public minimizeMessenger = (): boolean =>
    this.isMessenger = false

  public maximizeMessenger = (): boolean =>
    this.isMessenger = true
}
