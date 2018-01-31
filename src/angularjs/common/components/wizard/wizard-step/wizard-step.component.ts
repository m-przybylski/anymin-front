import { WizardStepComponentController } from './wizard-step.controller';

// tslint:disable:member-ordering
export class WizardStepModuleComponent implements ng.IComponentOptions {
  public transclude: boolean = true;
  public controller: ng.Injectable<ng.IControllerConstructor> = WizardStepComponentController;
  public template = require('./wizard-step.html');
  public require = {
    wizardHandler: '^wizardHandler'
  };
  public bindings: {[boundProperty: string]: string} = {
    title: '@',
    checkIsStepValid: '<',
    additionalText: '@',
    tooltipText: '@',
    buttonTitle: '@',
    onGoToNext: '<?',
    onGoBack: '<?',
    required: '<',
    isCompany: '<'
  };
}
