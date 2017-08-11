import * as angular from 'angular'
import {BtnDropdownComponent} from './btn-dropdown.component'
import './btn-dropdown.sass'
import {BtnDropdownAnimationComponent} from './btn-dropdown.animation'

export interface IBtnDropdownComponentBindings extends ng.IController {
  callback: () => void
  buttonText: string
  buttonClass: string
}

const btnDropdownModule = angular.module('profitelo.components.interface.btn-dropdown', [
  'pascalprecht.translate'
])
.component('btnDropdown', new BtnDropdownComponent)
.animation('.collapse-height', BtnDropdownAnimationComponent)
  .name

export default btnDropdownModule
