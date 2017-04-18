namespace profitelo.components.dashboard.settings.manageDevices {

  export interface IManageDevicesComponentBindings {
    deviceInUseStatus: boolean
    deviceLocalization: string
    deviceSystem: string
    onDeviceRemove: (apiKey: string) => void
    device: string
    apiKey: string
  }

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

    /* @ngInject */
    constructor() {
      this.deviceInUseStatus = false
    }

    $onInit = () => {
      this.currentDevice = (<any>this.checkDevice)[this.device]
    }

    public onLogout = () => {
      this.onDeviceRemove(this.apiKey)
    }

  }

  class ManageDevicesComponent implements ng.IComponentOptions {
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

  angular.module('profitelo.components.dashboard.settings.manage-devices', [
    'pascalprecht.translate',
    'profitelo.resolvers.security-settings'
  ])
  .component('manageDevices', new ManageDevicesComponent())
}
