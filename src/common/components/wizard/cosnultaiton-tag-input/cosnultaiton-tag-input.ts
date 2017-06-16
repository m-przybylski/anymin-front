import * as angular from 'angular'
import {ConsultationTagInputComponent} from './cosnultaiton-tag-input.component'
import './cosnultaiton-tag-input.sass'
import inputModule from '../../interface/input/input'
import ValidationAlertModule from '../../interface/alert/validation-alert/validation-alert'

export interface IConsultationTagInputBindings extends ng.IController {
  dictionary: string[]
  selectedTags: string[]
}

const consultationTagInputModule = angular.module('profitelo.components.wizard.consultation-tag-input', [
    'pascalprecht.translate',
    inputModule,
    ValidationAlertModule
  ])
  .component('consultationTagInput', new ConsultationTagInputComponent)
    .name

export default consultationTagInputModule
