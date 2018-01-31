import { IManageDevicesComponentBindings } from './manage-devices';

// tslint:disable:member-ordering
export class ManageDevicesComponentController implements ng.IController, IManageDevicesComponentBindings {
  public deviceInUseStatus: boolean;
  public deviceLocalization: string;
  public deviceSystem: string;
  public onDeviceRemove: (apiKey: string) => void;
  public device: string;
  public apiKey: string;
  public checkDevice = {
    desktop: 'icon-computer-24',
    tablet: 'icon-tablet-24',
    mobile: 'icon-smartphone-24',
    unknown: 'icon-questionmark-24'
  };
  public currentDevice: string;

  public static $inject = [];

  constructor() {
    this.deviceInUseStatus = false;
  }

  public $onInit = (): void => {
    this.currentDevice = (<any>this.checkDevice)[this.device];
  }

  public onLogout = (): void => {
    this.onDeviceRemove(this.apiKey);
  }

}
