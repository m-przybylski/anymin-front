// tslint:disable:prefer-method-signature
// tslint:disable:new-parens
import * as angular from 'angular';
import { WizardStepModuleComponent } from './wizard-step.component';
import tooltipModule from '../../interface/tooltip/tooltip';

export interface IWizardStepModuleComponentBindings extends ng.IController {
  title: string;
  checkIsStepValid: () => boolean;
  additionalText: string;
  tooltipText?: string;
  buttonTitle: string;
  required: boolean;
  onGoToNext?: () => void;
  onGoBack?: () => void;
  isCompany?: boolean;
}

const wizardStepModule = angular.module('profitelo.components.wizard.wizard-step', [
    'pascalprecht.translate',
    tooltipModule
  ])
  .component('wizardStep', new WizardStepModuleComponent)
    .name;

export default wizardStepModule;
