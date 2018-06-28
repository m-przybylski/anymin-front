// tslint:disable:readonly-array
// tslint:disable:new-parens
import * as angular from 'angular';
import { InputConsultationTagComponent } from './input-consultaiton-tag.component';
import inputModule from '../../interface/input/input';
import ValidationAlertModule from '../../interface/alert/validation-alert/validation-alert';
import apiModule from 'profitelo-api-ng/api.module';
import promiseModule from '../../../services/promise/promise';
import ngEnter from '../../../directives/ng-enter/ng-enter';

export interface IInputConsultationTagBindings extends ng.IController {
  serviceName: string;
  serviceDescription: string;
  selectedTags: string[];
  isValid?: boolean;
  validationText?: string;
  isSubmitted?: boolean;
}

const inputConsultationTagModule = angular.module('profitelo.components.wizard.input-consultation-tag', [
  'pascalprecht.translate',
  inputModule,
  apiModule,
  promiseModule,
  ValidationAlertModule,
  ngEnter
])
.component('inputConsultationTag', new InputConsultationTagComponent)
  .name;

export default inputConsultationTagModule;
