import * as angular from 'angular'
import {CheckboxComponent} from './checkbox.component'
import './checkbox.sass'

export interface CheckboxComponentBindings extends ng.IController {
  inputText: string
  additionalText: string
  ngModel: boolean
  isDisabled: boolean
  isRequired: boolean
  onChange?: ()=> void
}

const checkboxModule = angular.module('profitelo.components.interface.checkbox', [

])
.component('checkbox', new CheckboxComponent)
  .name

export default checkboxModule
