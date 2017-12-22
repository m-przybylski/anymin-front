import * as angular from 'angular'
import {RadioBtnTextareaComponent} from './radio-btn-textarea.component'
import './radio-btn-textarea.sass'
import autoFocus from '../../../directives/auto-focus/auto-focus'
import {RadioBtnTextareaAnimation} from './radio-btn-textarea.animation'

export interface IRadioBtnTextareaBindings extends ng.IController {
  id: string
  name: string
  value: string
  label: string
  ngModel: string
  checkedItem?: string
  onSelectedItem: (value: string) => void
  onDescriptionCallback: (description: string) => string
  isTextarea: boolean
}

const radioBtnTextarea = angular.module('profitelo.components.interface.radio-btn-textarea', [
  'pascalprecht.translate',
  autoFocus
])
.component('radioBtnTextarea', new RadioBtnTextareaComponent)
.animation('.collapse-height', RadioBtnTextareaAnimation.getInstance())
  .name

export default radioBtnTextarea
