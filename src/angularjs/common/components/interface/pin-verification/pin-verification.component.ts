// tslint:disable:no-require-imports
import { PinVerificationComponentController } from './pin-verification.controller';

// tslint:disable:member-ordering
export class PinVerificationComponent implements ng.IComponentOptions {

  public controller: ng.Injectable<ng.IControllerConstructor> = PinVerificationComponentController;
  public template = require('./pin-verification.html');
  public bindings: {[boundProperty: string]: string} = {
    onSendPinAgain: '<',
    onCompletePinInputs: '<',
    isButtonDisabled: '<'
  };
}
