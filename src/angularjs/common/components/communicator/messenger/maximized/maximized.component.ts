import { MessengerMaximizedComponentController } from './maximized.controller';

// tslint:disable:member-ordering
export class MessengerMaximizedComponent implements ng.IComponentOptions {
  public template = require('./maximized.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = MessengerMaximizedComponentController;
  public bindings: {[boundProperty: string]: string} = {
    callCost: '<',
    isMessenger: '<',
    minimizeMessenger: '<',
    callLength: '<'
  };
}
