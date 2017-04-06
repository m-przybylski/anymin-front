import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import urlModule from '../../../../../../services/url/url'
import filtersModule from '../../../../../../filters/filters'
import '../../../../../../components/interface/collapse-btn/collapse-btn'
import {ExpertConsultationDetailsController} from './consultation-details.controller'
import './consultation-details.sass'
import tagsListModule from '../../../../../tags-list/tags-list'

const expertConsultationDetailsModalModule = angular.module('profitelo.components.dashboard.expert.activities.modals.consultation-details', [
  'ui.bootstrap',
  apiModule,
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  filtersModule,
  'profitelo.components.interface.collapse-btn',
  urlModule,
  tagsListModule
])
.controller('expertConsultationDetails', ExpertConsultationDetailsController)

export default expertConsultationDetailsModalModule
