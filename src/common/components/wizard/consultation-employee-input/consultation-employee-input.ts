import * as angular from 'angular'
import {ConsultationEmployeeInputComponent} from './consultation-employee-input.component'
import './consultation-employee-input.sass'
import inputModule from '../../interface/input/input'
import checkboxModule from '../../interface/checkbox/checkbox'
import commonSettingsModule from '../../../services/common-settings/common-settings'

export interface IConsultationEmployeeInputBindings extends ng.IController {
}

const consultationEmployeeInputModule = angular.module('profitelo.components.wizard.consultation-employee-input', [
  'pascalprecht.translate',
  inputModule,
  checkboxModule,
  commonSettingsModule
])
.component('consultationEmployeeInput', new ConsultationEmployeeInputComponent)
  .name

export default consultationEmployeeInputModule
