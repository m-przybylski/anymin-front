import * as angular from 'angular'
import {WizardStepModuleComponent} from './wizard-step.component'
import './wizard-step.sass'
import tooltipModule from '../../interface/tooltip/tooltip'

export interface IWizardStepModuleComponentBindings extends ng.IController {
  title: string,
  checkIsStepValid: () => void,
  additionalText: string,
  tooltipText: string
}

const wizardStepModule = angular.module('profitelo.components.wizard.wizard-step', [
    'pascalprecht.translate',
    tooltipModule
  ])
  .component('wizardStep', new WizardStepModuleComponent)
    .name

export default wizardStepModule
