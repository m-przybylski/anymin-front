import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import urlModule from '../../../../../../services/url/url'
import filtersModule from '../../../../../../filters/filters'
import '../../../../../../components/interface/collapse-btn/collapse-btn'
import './complain/complain'
import './consultation-details-chat/consultation-details-chat'
import './recommended-tags/recommended-tags'
import {ClientConsultationDetailsController} from './consultation-details.controller'
import userAvatarModule from '../../../../../interface/user-avatar/user-avatar'
import './consultation-details.sass'

const clientConsultationDetailsModalModule = angular.module(
  'profitelo.components.dashboard.client.activities.modals.consultation-details', [
  'ui.bootstrap',
  apiModule,
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  filtersModule,
  'profitelo.components.interface.collapse-btn',
  'profitelo.components.dashboard.client.activities.modals.consultation-details.complain',
  'profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat',
  'profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags',
  urlModule,
  userAvatarModule
])
.controller('clientConsultationDetails', ClientConsultationDetailsController)

export default clientConsultationDetailsModalModule
