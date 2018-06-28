// tslint:disable:prefer-method-signature
// tslint:disable:new-parens
import * as angular from 'angular';
import { CheckboxComponent } from './checkbox.component';
import ValidationAlertModule from '../alert/validation-alert/validation-alert';

export interface ICheckboxComponentBindings extends ng.IController {
  inputText: string;
  additionalText?: string;
  name: string;
  alertText?: string;
  validation?: boolean;
  ngModel: boolean;
  isDisabled?: boolean;
  ngRequired?: boolean;
  onChange?: () => void;
  translationParam?: string;
}

const checkboxModule = angular.module('profitelo.components.interface.checkbox', [
  'pascalprecht.translate',
  ValidationAlertModule
])
.component('checkbox', new CheckboxComponent)
  .name;

export default checkboxModule;
