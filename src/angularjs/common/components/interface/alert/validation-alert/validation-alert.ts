import * as angular from 'angular'
import {ValidationAlertComponent} from './validation-alert.component'
import {ValidationAlertAnimation} from './validation-alert.animation'

export interface IValidationAlertBindings extends ng.IController {
  alertText: string
  additionalText?: string
  isVisible: boolean
}

const ValidationAlertModule = angular.module('profitelo.components.alert.validation-alert', [
  'pascalprecht.translate'
])
.component('validationAlert', new ValidationAlertComponent)
.animation('.collapse-height', ValidationAlertAnimation)
  .name

export default ValidationAlertModule
