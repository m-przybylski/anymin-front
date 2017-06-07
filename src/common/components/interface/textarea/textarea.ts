import * as angular from 'angular'
import {InputComponent} from './textarea.component'
import './textarea.sass'

export interface ITextareaComponentBindings extends ng.IController {
  id: string
  name: string
  inputText: string
  placeholder: string
  validationText: string
  isValid: boolean
  isSubmitted?: boolean
  maxLength: string
  ngModel: boolean
}

const textareaModule = angular.module('profitelo.components.interface.textarea', [
  'pascalprecht.translate'
])
.component('textareaPrimary', new InputComponent)
  .name

export default textareaModule
