import {PinVerificationComponentController} from './pin-verification.controller';

export class PinVerificationComponent implements ng.IComponentOptions {

  controller: ng.Injectable<ng.IControllerConstructor> = PinVerificationComponentController
  template = require('./pin-verification.pug')
  bindings: {[boundProperty: string]: string} = {
    onSendPinAgain: '<',
    onCompletePinInputs: '<'
  }
}
