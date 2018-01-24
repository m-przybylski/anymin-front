import * as angular from 'angular'
import 'angular-translate'
import apiModule from 'profitelo-api-ng/api.module'
import '../../../interface/dropdown/dropdown'
import '../../../../directives/interface/pro-calendar/pro-calendar'
import {GetActivityFilters, FinancialOperation} from 'profitelo-api-ng/model/models'
import {DashboardFiltersComponent} from './filters.component'
import dashboardActivitiesModule from '../../../../services/dashboard-activites/dashboard-activites'
import {ActivitiesQueryParams} from '../../../../services/dashboard-activites/activities-query-params'
import userModule from '../../../../services/user/user'
import translatorModule from '../../../../services/translator/translator'

export interface IDashboardFiltersComponentBindings extends ng.IController {
  onSetSearchParams: (queryParams: ActivitiesQueryParams) => void
  filters: GetActivityFilters
  accountType: FinancialOperation.AccountTypeEnum
}

const dashboardFiltersModule = angular.module('profitelo.components.dashboard.expert.activities.filters', [
  'pascalprecht.translate',
  'profitelo.components.interface.dropdown',
  'profitelo.filters.normalize-translation-key-filter',
  'profitelo.directives.interface.pro-calendar',
  dashboardActivitiesModule,
  userModule,
  apiModule,
  translatorModule,
  'profitelo.directives.interface.pro-calendar'
])
  .component('dashboardFilters', new DashboardFiltersComponent())
  .name

export default dashboardFiltersModule
