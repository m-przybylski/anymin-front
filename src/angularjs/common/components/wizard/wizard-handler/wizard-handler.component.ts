import { WizardHandlerComponentController } from './wizard-handler.controller';
// tslint:disable:member-ordering
export class WizardHandlerComponent implements ng.IComponentOptions {
  public transclude: boolean = true;
  public controller: ng.Injectable<ng.IControllerConstructor> = WizardHandlerComponentController;
  public template = require('./wizard-handler.html');
  public bindings: {[boundProperty: string]: string} = {
    onStepChange: '<',
    progressBarText: '@'
  };
}
