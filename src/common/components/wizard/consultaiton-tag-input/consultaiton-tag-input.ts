import * as angular from 'angular'
import {ConsultationTagInputComponent} from './consultaiton-tag-input.component'
import './consultaiton-tag-input.sass'
import inputModule from '../../interface/input/input'
import ValidationAlertModule from '../../interface/alert/validation-alert/validation-alert'

export interface IConsultationTagInputBindings extends ng.IController {
  dictionary: string[]
  selectedTags: string[]
  isValid?: boolean
  validationText?: string
  isSubmitted?: boolean
}

const consultationTagInputModule = angular.module('profitelo.components.wizard.consultation-tag-input', [
    'pascalprecht.translate',
    inputModule,
    ValidationAlertModule
  ])
  .component('consultationTagInput', new ConsultationTagInputComponent)
    .name

export default consultationTagInputModule
