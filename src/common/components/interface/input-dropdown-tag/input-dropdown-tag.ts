import * as angular from 'angular'
import {InputDropdownTagComponent} from './input-dropdown-tag.component'
import './input-dropdown-tag.sass'
import {IDropdownInputDictionary} from './input-dropdown-tag.controller'

export interface InputDropdownTagComponentBindings extends ng.IController {
  label: string
  placeholder: string
  dictionary: IDropdownInputDictionary
  hintLabel: string
}

const inputDropdownTagModule = angular.module('profitelo.components.interface.input-dropdown-tag', [
    'pascalprecht.translate'
  ])
  .component('inputDropdownTag', new InputDropdownTagComponent)
    .name

export default inputDropdownTagModule
