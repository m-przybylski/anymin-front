import * as angular from 'angular'
import {InputPasswordComponent} from './input-password.component'
import './input-password.sass'
import ValidationAlertModule from '../alert/validation-alert/validation-alert'

export interface IInputPasswordComponentBindings extends ng.IController {
  id: string
  name: string
  type: string
  inputText: string
  placeholder: string
  validationText: string
  isValid: boolean
  ngRequired: boolean
  ngModel: string
  ngPattern: string
  isSubmitted?: boolean
  onChange?: string
}

const inputPasswordModule = angular.module('profitelo.components.interface.input-password', [
  'pascalprecht.translate',
  ValidationAlertModule
])
.component('inputPassword', new InputPasswordComponent)
  .name

export default inputPasswordModule
