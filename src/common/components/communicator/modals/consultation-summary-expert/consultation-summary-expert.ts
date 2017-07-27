import * as angular from 'angular'
import tagsListModule from '../../../tags-list/tags-list'
import textareaModule from '../../../interface/textarea/textarea'
import {ConsultationSummaryExpertController} from './consultation-summary-expert.controller'

const consultationSummaryExpertControllerModule = angular.module(
  'profitelo.components.communicator.modals.consultation-summary-expert', [
  'ui.bootstrap',
  'profitelo.services.call-summary',
  'profitelo.components.interface.preloader',
  tagsListModule,
  'profitelo.components.interface.radio-text',
  textareaModule
])
.controller('consultationSummaryExpertController', ConsultationSummaryExpertController)
  .name

export default consultationSummaryExpertControllerModule
