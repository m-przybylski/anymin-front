import * as angular from 'angular'
import {DashboardExpertComplainsListComponent} from './complains-list.component'

export interface IDashboardExpertComplainsListBindings extends ng.IController {
  headerTitle: string
}

const dashboardExpertComplainsListModule = angular.module('profitelo.common.dashboard.expert.complains.complains-list',
  ['pascalprecht.translate'])
.component('complainsList', new DashboardExpertComplainsListComponent())
  .name

export default dashboardExpertComplainsListModule
