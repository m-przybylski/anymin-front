import * as angular from 'angular';
import apiModule from 'profitelo-api-ng/api.module';
import urlModule from '../../../../../../services/url/url';
import filtersModule from '../../../../../../filters/filters';
import '../../../../../../components/interface/collapse-btn/collapse-btn';
import { ExpertConsultationDetailsController } from './consultation-details.controller';
import tagsListModule from '../../../../../tags-list/tags-list';
import '../../../../../../components/interface/radio-text/radio-text';
import textareaModule from '../../../../../interface/textarea/textarea';
import chatHistoryModule from '../../../../../chat-history/chat-history';

const expertConsultationDetailsModalModule = angular.module(
  'profitelo.components.dashboard.expert.activities.modals.consultation-details', [
  'ui.bootstrap',
  apiModule,
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  filtersModule,
  'profitelo.components.interface.collapse-btn',
  urlModule,
  tagsListModule,
  'profitelo.components.interface.radio-text',
  textareaModule,
  chatHistoryModule
])
.controller('expertConsultationDetails', ExpertConsultationDetailsController);

export default expertConsultationDetailsModalModule;
