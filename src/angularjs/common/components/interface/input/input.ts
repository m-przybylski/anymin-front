import * as angular from 'angular'
import {InputComponent} from './input.component'
import ValidationAlertModule from '../alert/validation-alert/validation-alert'
import commonSettingsModule from '../../../services/common-settings/common-settings'

export interface IInputComponentBindings extends ng.IController {
  id: string
  name: string
  type: string
  inputText: string
  placeholder: string
  validationText: string
  maxLength: string
  isValid: boolean
  ngRequired: boolean
  ngModel: string
  isSubmitted?: boolean
  onChangeCallback?: (value: string) => void
}

const inputModule = angular.module('profitelo.components.interface.input', [
  'pascalprecht.translate',
  commonSettingsModule,
  ValidationAlertModule
])
.component('inputPrimary', new InputComponent)
  .name

export default inputModule
