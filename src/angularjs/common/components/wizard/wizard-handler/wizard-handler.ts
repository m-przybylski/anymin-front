// tslint:disable:new-parens
import * as angular from 'angular';
import { WizardHandlerComponent } from './wizard-handler.component';

export interface IWizardHandlerComponentBindings extends ng.IController {
  onStepChange: () => void;
  progressBarText: string;
}

const wizardHandlerModule = angular.module('profitelo.components.wizard.wizard-handler', [
  'pascalprecht.translate'
])
.component('wizardHandler', new WizardHandlerComponent)
  .name;

export default wizardHandlerModule;
