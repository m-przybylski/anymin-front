import * as angular from 'angular'
import '../../../directives/interface/focus-next/focus-next'
import '../../../directives/interface/pro-input/pro-input'
import {PinVerificationComponent} from './pin-verification.component';

export interface IPinVerificationComponentBindings {
  onSendPinAgain: () => void
  onCompletePinInputs: (token: string, callback: () => void) => void
}

const pinVerificationModule: string = angular.module('profitelo.components.interface.pin-verification', [
  'pascalprecht.translate',
  'profitelo.directives.interface.focus-next',
  'profitelo.directives.interface.pro-input'
])
  .component('pinVerification', new PinVerificationComponent())
  .name

export default pinVerificationModule
