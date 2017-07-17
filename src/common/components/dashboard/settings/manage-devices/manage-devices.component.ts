import {ManageDevicesComponentController} from './manage-devices.controller';

export class ManageDevicesComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl'
  controller: ng.Injectable<ng.IControllerConstructor> = ManageDevicesComponentController
  template = require('./manage-devices.pug')()
  bindings: {[boundProperty: string]: string} = {
    device: '@',
    apiKey: '<',
    onDeviceRemove: '<',
    deviceInUseStatus: '<',
    deviceLocalization: '@',
    deviceSystem: '@'
  }
}
