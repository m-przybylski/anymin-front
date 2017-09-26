import * as angular from 'angular'
import {InputConsultationTagComponent} from './input-consultaiton-tag.component'
import './input-consultaiton-tag.sass'
import inputModule from '../../interface/input/input'
import ValidationAlertModule from '../../interface/alert/validation-alert/validation-alert'

export interface IInputConsultationTagBindings extends ng.IController {
  dictionary: string[]
  selectedTags: string[]
  isValid?: boolean
  validationText?: string
  isSubmitted?: boolean
}

const inputConsultationTagModule = angular.module('profitelo.components.wizard.input-consultation-tag', [
    'pascalprecht.translate',
    inputModule,
    ValidationAlertModule
  ])
  .component('inputConsultationTag', new InputConsultationTagComponent)
    .name

export default inputConsultationTagModule
