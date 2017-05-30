import * as angular from 'angular'
import {CheckboxComponent} from './checkbox.component'
import './checkbox.sass'

export interface ICheckboxComponentBindings extends ng.IController {
  inputText: string
  additionalText?: string
  name: string
  alertText?: string
  validation?: boolean
  ngModel: boolean
  isDisabled?: boolean
  ngRequired?: boolean
  onChange?: () => void
}

const checkboxModule = angular.module('profitelo.components.interface.checkbox', [
  'pascalprecht.translate'
])
.component('checkbox', new CheckboxComponent)
  .name

export default checkboxModule
