import * as angular from 'angular';
import tagsListModule from '../../../tags-list/tags-list';
import textareaModule from '../../../interface/textarea/textarea';
import { ConsultationSummaryExpertController } from './consultation-summary-expert.controller';
import topAlertModule from '../../../../services/top-alert/top-alert';
import translatorModule from '../../../../services/translator/translator';
import errorHandlerModule from '../../../../services/error-handler/error-handler';
import radioBtnTextarea from '../../../interface/radio-btn-textarea/radio-btn-textarea';
import { ConsultationSummaryExpertService } from './consultation-summary-expert.service';
import apiModule from 'profitelo-api-ng/api.module';

const consultationSummaryExpertControllerModule = angular.module(
  'profitelo.components.communicator.modals.consultation-summary-expert', [
    apiModule,
    'ui.bootstrap',
    'profitelo.services.call-summary',
    'profitelo.components.interface.preloader',
    tagsListModule,
    'profitelo.components.interface.radio-text',
    textareaModule,
    topAlertModule,
    translatorModule,
    errorHandlerModule,
    radioBtnTextarea,
    'profitelo.components.interface.collapse-btn'
  ])
  .controller('consultationSummaryExpertController', ConsultationSummaryExpertController)
  .service('consultationSummaryExpertService', ConsultationSummaryExpertService)
  .name;

export default consultationSummaryExpertControllerModule;
