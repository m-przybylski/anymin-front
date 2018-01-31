import * as angular from 'angular';
import { InputConsultationEmployeeComponent } from './input-consultation-employee.component';
import inputModule from '../../interface/input/input';
import checkboxModule from '../../interface/checkbox/checkbox';
import commonSettingsModule from '../../../services/common-settings/common-settings';
import ValidationAlertModule from '../../interface/alert/validation-alert/validation-alert';
import ngEnter from '../../../directives/ng-enter/ng-enter';

export interface IInputConsultationEmployeeBindings extends ng.IController {
  isOwnerEmployee: boolean;
  addedItemsList: string[];
  isValid?: boolean;
  isSubmitted?: boolean;
  validationText?: string;
  isCheckboxVisible?: boolean;
}

const inputConsultationEmployeeModule = angular.module('profitelo.components.interface.input-consultation-employee', [
  'pascalprecht.translate',
  inputModule,
  checkboxModule,
  commonSettingsModule,
  ValidationAlertModule,
  ngEnter
])
.component('inputConsultationEmployee', new InputConsultationEmployeeComponent)
  .name;

export default inputConsultationEmployeeModule;
