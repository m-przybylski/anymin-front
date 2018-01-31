import { MessengerMinimizedComponentController } from './minimized.controller';

// tslint:disable:member-ordering
export class MessengerMinimizedComponent implements ng.IComponentOptions {
  public template = require('./minimized.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = MessengerMinimizedComponentController;
  public bindings: {[boundProperty: string]: string} = {
    onMessageClick: '<'
  };
}
