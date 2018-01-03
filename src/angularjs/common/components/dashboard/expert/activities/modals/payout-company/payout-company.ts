import * as angular from 'angular'
import '../../../../../../components/interface/collapse-btn/collapse-btn'
import tagsListModule from '../../../../../tags-list/tags-list'
import {ExpertPayoutCompanyModalController} from './payout-company.controller'

const expertPayoutCompanyModalModule = angular.module(
  'profitelo.components.dashboard.expert.activities.modals.payout-company', [
    'ui.bootstrap',
    'profitelo.components.interface.preloader',
    'profitelo.directives.interface.scrollable',
    'profitelo.components.interface.collapse-btn',
    tagsListModule
  ])
  .controller('expertPayoutCompanyController', ExpertPayoutCompanyModalController)

export default expertPayoutCompanyModalModule
