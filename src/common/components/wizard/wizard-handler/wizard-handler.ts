import * as angular from 'angular'
import {WizardHandlerComponent} from './wizard-handler.component'
import './wizard-handler.sass'

export interface IWizardHandlerComponentBindings extends ng.IController {
  onStepChange: () => void
}

const wizardHandlerModule = angular.module('profitelo.components.wizard.wizard-handler', [
  'pascalprecht.translate'
])
.component('wizardHandler', new WizardHandlerComponent)
  .name

export default wizardHandlerModule
