import * as angular from 'angular'
import {ConsultationEmployeeInputComponent} from './consultation-employee-input.component'
import './consultation-employee-input.sass'
import inputModule from '../../interface/input/input'
import checkboxModule from '../../interface/checkbox/checkbox'
import commonSettingsModule from '../../../services/common-settings/common-settings'
import ValidationAlertModule from '../../interface/alert/validation-alert/validation-alert'

export interface IConsultationEmployeeInputBindings extends ng.IController {
  isOwnerEmployee: boolean
  addedItemsList: string[]
  isValid?: boolean
  isSubmitted?: boolean
  validationText?: string
}

const consultationEmployeeInputModule = angular.module('profitelo.components.wizard.consultation-employee-input', [
  'pascalprecht.translate',
  inputModule,
  checkboxModule,
  commonSettingsModule,
  ValidationAlertModule
])
.component('consultationEmployeeInput', new ConsultationEmployeeInputComponent)
  .name

export default consultationEmployeeInputModule
