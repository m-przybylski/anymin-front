import * as angular from 'angular'
import {ManageDevicesComponent} from './manage-devices.component';

export interface IManageDevicesComponentBindings {
  deviceInUseStatus: boolean
  deviceLocalization: string
  deviceSystem: string
  onDeviceRemove: (apiKey: string) => void
  device: string
  apiKey: string
}

const manageDevicesModule = angular.module('profitelo.components.dashboard.settings.manage-devices', [
  'pascalprecht.translate',
  'profitelo.resolvers.security-settings'
])
  .component('manageDevices', new ManageDevicesComponent())
  .name

export default manageDevicesModule
