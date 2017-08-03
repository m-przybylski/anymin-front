import * as angular from 'angular'
import {InputDropdownTagComponent} from './input-dropdown-tag.component'
import './input-dropdown-tag.sass'
import {IDropdownInputDictionary} from './input-dropdown-tag.controller'
import ngEnter from '../../../directives/ng-enter/ng-enter'
import ValidationAlertModule from '../alert/validation-alert/validation-alert'

export interface InputDropdownTagComponentBindings extends ng.IController {
  label: string
  placeholder: string
  dictionary: IDropdownInputDictionary
  hintLabel: string
  isValid?: boolean
  validationText?: string
  isSubmitted?: boolean
  selectedItemsValue: string[]
}

const inputDropdownTagModule = angular.module('profitelo.components.interface.input-dropdown-tag', [
    'pascalprecht.translate',
    ngEnter,
    ValidationAlertModule
  ])
  .component('inputDropdownTag', new InputDropdownTagComponent)
    .name

export default inputDropdownTagModule
