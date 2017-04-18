import * as angular from 'angular'
import '../../../../../../components/interface/collapse-btn/collapse-btn'
import tagsListModule from '../../../../../tags-list/tags-list'
import {ExpertPayoutCivilModalConttroller} from './payout-civil.controller'

const expertPayoutCivilModalModule = angular.module('profitelo.components.dashboard.expert.activities.modals.payout-civil', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  'profitelo.components.interface.collapse-btn',
  tagsListModule
])
.controller('expertPayoutCivilController', ExpertPayoutCivilModalConttroller)

export default expertPayoutCivilModalModule

