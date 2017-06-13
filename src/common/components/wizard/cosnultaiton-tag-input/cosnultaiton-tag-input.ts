import * as angular from 'angular'
import {ConsultationTagInputComponent} from './cosnultaiton-tag-input.component'
import './cosnultaiton-tag-input.sass'
import inputModule from '../../interface/input/input'

export interface IConsultationTagInputBindings extends ng.IController {
  dictionary: string[]
  selectedTags: string[]
}

const consultationTagInputModule = angular.module('profitelo.components.wizard.consultation-tag-input', [
    'pascalprecht.translate',
    inputModule
  ])
  .component('consultationTagInput', new ConsultationTagInputComponent)
    .name

export default consultationTagInputModule
