namespace profitelo.components.dashboard.settings.manageDevices {

  import IScope = angular.IScope
  export interface IManageDevicesComponentBindings {
    deviceInUseStatus: boolean
    deviceLocalization: string
    deviceSystem: string
    device: any
  }

  export class ManageDevicesComponentController implements ng.IController, IManageDevicesComponentBindings {
    deviceInUseStatus: boolean
    deviceLocalization: string
    deviceSystem: string
    device: any
    checkDevice: any
    currentDevice: any

    /* @ngInject */
    constructor() {
      this.deviceInUseStatus = false
    }

    $onInit = () => {
      enum checkDevice {
        desktop = <any>'icon-computer-24',
        tablet = <any>'icon-tablet-24',
        mobile = <any>'icon-smartphone-24'
      }

      this.currentDevice = checkDevice[this.device]
    }

  }

  class ManageDevicesComponent implements ng.IComponentOptions {
    controllerAs: '$ctrl'
    controller: ng.Injectable<ng.IControllerConstructor> = ManageDevicesComponentController
    templateUrl: string = 'components/dashboard/settings/manage-devices/manage-devices.tpl.html'
    bindings: {[boundProperty: string]: string} = {
      device: '@',
      deviceInUseStatus: '<',
      deviceLocalization: '@',
      deviceSystem: '@'
    }
  }

  angular.module('profitelo.components.dashboard.settings.manage-devices', [
    'pascalprecht.translate'
  ])
  .component('manageDevices', new ManageDevicesComponent())
}
