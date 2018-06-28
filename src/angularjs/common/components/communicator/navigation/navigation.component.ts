// tslint:disable:no-require-imports
import { NavigationComponentController } from './navigation.controller';

// tslint:disable:member-ordering
export class NavigationComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = NavigationComponentController;
  public template = require('./navigation.html');
  public bindings: { [boundProperty: string]: string } = {
    isVideo: '=',
    isMessenger: '=',
    currentCall: '<'
  };
}
