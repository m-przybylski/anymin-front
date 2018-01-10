import {NavigationComponentController} from './navigation.controller';

export class NavigationComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = NavigationComponentController
  template = require('./navigation.html')
  bindings: { [boundProperty: string]: string } = {
    isVideo: '=',
    isMessenger: '=',
    currentCall: '<'
  }
}
