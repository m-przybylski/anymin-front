import * as angular from 'angular'
import {InputComponent} from './input.component'
import './input.sass'
import ValidationAlertModule from '../alert/validation-alert/validation-alert'

export interface IInputComponentBindings extends ng.IController {
  id: string
  name: string
  inputText: string
  placeholder: string
  validationText: string
  maxLength: string
  isValid: boolean
  ngRequired: boolean
  ngModel: boolean
  ngPattern: string
  isSubmitted?: boolean
}

const inputModule = angular.module('profitelo.components.interface.input', [
  'pascalprecht.translate',
  ValidationAlertModule
])
.component('inputPrimary', new InputComponent)
  .name

export default inputModule
