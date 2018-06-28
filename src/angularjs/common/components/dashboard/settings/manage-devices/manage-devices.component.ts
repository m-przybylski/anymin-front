// tslint:disable:no-require-imports
import { ManageDevicesComponentController } from './manage-devices.controller';

// tslint:disable:member-ordering
export class ManageDevicesComponent implements ng.IComponentOptions {
  public controllerAs: '$ctrl';
  public controller: ng.Injectable<ng.IControllerConstructor> = ManageDevicesComponentController;
  public template = require('./manage-devices.html');
  public bindings: {[boundProperty: string]: string} = {
    device: '@',
    apiKey: '<',
    onDeviceRemove: '<',
    deviceInUseStatus: '<',
    deviceLocalization: '@',
    deviceSystem: '@'
  };
}
