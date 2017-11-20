import * as angular from 'angular'
import tagsListModule from '../../../tags-list/tags-list'
import textareaModule from '../../../interface/textarea/textarea'
import {ConsultationSummaryExpertController} from './consultation-summary-expert.controller'
import topAlertModule from '../../../../services/top-alert/top-alert'
import translatorModule from '../../../../services/translator/translator'
import errorHandlerModule from '../../../../services/error-handler/error-handler'
import './consultation-summary-expert.sass'

const consultationSummaryExpertControllerModule = angular.module(
  'profitelo.components.communicator.modals.consultation-summary-expert', [
  'ui.bootstrap',
  'profitelo.services.call-summary',
  'profitelo.components.interface.preloader',
  tagsListModule,
  'profitelo.components.interface.radio-text',
  textareaModule,
  topAlertModule,
  translatorModule,
  errorHandlerModule
])
.controller('consultationSummaryExpertController', ConsultationSummaryExpertController)
  .name

export default consultationSummaryExpertControllerModule
