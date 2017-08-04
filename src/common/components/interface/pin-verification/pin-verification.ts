import * as angular from 'angular'
import '../../../directives/interface/focus-next/focus-next'
import {PinVerificationComponent} from './pin-verification.component'
import commonSettingsModule from '../../../services/common-settings/common-settings'

export interface IPinVerificationComponentBindings {
  onSendPinAgain: () => void
  onCompletePinInputs: (token: string, callback: () => void) => void
}

const pinVerificationModule: string = angular.module('profitelo.components.interface.pin-verification', [
  'pascalprecht.translate',
  'profitelo.directives.interface.focus-next',
  commonSettingsModule
])
  .component('pinVerification', new PinVerificationComponent())
  .name

export default pinVerificationModule
