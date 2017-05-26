import * as angular from 'angular'
import {WizardStepModuleComponent} from './wizard-step.component'
import './wizard-step.sass'
import {WizardHandlerComponentController} from '../wizard-handler/wizard-handler.controller'
import tooltipModule from '../../interface/tooltip/tooltip'

export interface IWizardStepModuleComponentBindings extends ng.IController {
  wizardHandler: WizardHandlerComponentController,
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
