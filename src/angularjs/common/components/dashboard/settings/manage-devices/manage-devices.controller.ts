import {IManageDevicesComponentBindings} from './manage-devices';

export class ManageDevicesComponentController implements ng.IController, IManageDevicesComponentBindings {
  deviceInUseStatus: boolean
  deviceLocalization: string
  deviceSystem: string
  onDeviceRemove: (apiKey: string) => void
  device: string
  apiKey: string
  checkDevice = {
    desktop: 'icon-computer-24',
    tablet: 'icon-tablet-24',
    mobile: 'icon-smartphone-24',
    unknown: 'icon-questionmark-24'
  }
  currentDevice: string

  static $inject = [];

  constructor() {
    this.deviceInUseStatus = false
  }

  $onInit = (): void => {
    this.currentDevice = (<any>this.checkDevice)[this.device]
  }

  public onLogout = (): void => {
    this.onDeviceRemove(this.apiKey)
  }

}
