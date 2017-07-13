import * as angular from 'angular'
import {InputPriceComponent} from './input-price.component'
import './input-price.sass'
import ValidationAlertModule from '../alert/validation-alert/validation-alert'
import commonSettingsModule from '../../../services/common-settings/common-settings'

export interface IInputPriceComponentBindings extends ng.IController {
  id: string
  name: string
  placeholder: string
  inputText: string
  validationText?: string
  isValid: boolean
  isSubmitted?: boolean
  ngModel: number
  currency: string
  ngPattern: RegExp
}

const inputPriceModule = angular.module('profitelo.components.interface.input-price', [
  'pascalprecht.translate',
  ValidationAlertModule,
  commonSettingsModule
])
.component('inputPrice', new InputPriceComponent)
  .name

export default inputPriceModule
