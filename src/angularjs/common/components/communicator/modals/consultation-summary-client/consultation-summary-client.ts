import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import callSummaryModule from '../../../../services/call-summary/call-summary'
import urlModule from '../../../../services/url/url'
import {ConsultationSummaryClientController} from './consultation-summary-client.controller'
import textareaModule from '../../../interface/textarea/textarea'
import heightResizer from '../../../../directives/get-height/get-height'
import translatorModule from '../../../../services/translator/translator'

const consultationSummaryClientModule =
  angular.module('profitelo.components.communicator.modals.consultation-summary-client', [
    'ui.bootstrap',
    'profitelo.components.interface.multiselect',
    callSummaryModule,
    urlModule,
    translatorModule,
    apiModule,
    'profitelo.components.interface.preloader',
    textareaModule,
    heightResizer,
    'pascalprecht.translate'
  ])
    .controller('consultationSummaryClientController', ConsultationSummaryClientController)
    .name

export default consultationSummaryClientModule
