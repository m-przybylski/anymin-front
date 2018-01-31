import { MessengerComponentController } from './messenger.controller';

// tslint:disable:member-ordering
export class MessengerComponent implements ng.IComponentOptions {
  public template = require('./messenger.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = MessengerComponentController;
  public bindings: {[boundProperty: string]: string} = {
    callCost: '<',
    isMessenger: '=',
    callLength: '<'
  };
}
