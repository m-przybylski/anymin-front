import * as angular from 'angular'
import {ConsultationFormModalController} from './consultation-form-modal.controller'
import './consultation-form-modal.sass'
import '../../../../../../directives/interface/pro-tags-dropdown/pro-tags-dropdown.ts'
import inputModule from '../../../../../interface/input/input'
import textareaModule from '../../../../../interface/textarea/textarea'
import dropdownPrimaryModule from '../../../../../interface/dropdown-primary/dropdown-primary'
import consultationEmployeeInputModule
  from '../../../../../interface/input-consultation-employee/input-consultation-employee'
import inputPriceModule from '../../../../../interface/input-price/input-price'
import consultationTagInputModule from '../../../../../interface/input-consultaiton-tag/input-consultaiton-tag'
import ValidationAlertModule from '../../../../../interface/alert/validation-alert/validation-alert'
import apiModule from 'profitelo-api-ng/api.module'
import languagesModule from '../../../../../../services/languages/languages'

const consultationFormModalModule = angular.module(
  'profitelo.components.dashboard.expert.manage-profile.modals.consultation-form-modal', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.pro-tags-dropdown',
  'profitelo.components.interface.dropdown',
  apiModule,
  inputModule,
  textareaModule,
  dropdownPrimaryModule,
  consultationEmployeeInputModule,
  inputPriceModule,
  consultationTagInputModule,
  ValidationAlertModule,
  languagesModule
])
.controller('consultationFormModalController', ConsultationFormModalController)
  .name

export default consultationFormModalModule
