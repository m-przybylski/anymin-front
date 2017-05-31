import * as angular from 'angular'
import {InputComponent} from './input.component'
import './input.sass'

export interface IInputComponentBindings extends ng.IController {
  id: string
  name: string
  inputText: string
  placeholder: string
  alertText: string
  maxLength: string
  validation: boolean
  ngRequired: boolean
  ngModel: boolean
  ngPattern: string
}

const inputModule = angular.module('profitelo.components.interface.input', [
  'pascalprecht.translate'
])
.component('inputPrimary', new InputComponent)
  .name

export default inputModule
