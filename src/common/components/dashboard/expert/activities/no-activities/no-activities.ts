import * as angular from 'angular'
import 'angular-translate'
import {ExpertNoActivitiesComponent} from './no-activities.component'
import noResultsInformationModule from '../../../no-results-information/no-results-information';
import './no-activities.sass'

export interface IExpertNoActivitiesComponentBindings extends ng.IController {
  isPayoutMethod: boolean
}

const expertNoActivitiesModule = angular.module('profitelo.components.dashboard.expert.activities.no-activities', [
  noResultsInformationModule,
  'pascalprecht.translate'
])
  .component('expertNoActivities', new ExpertNoActivitiesComponent())
  .name

export default expertNoActivitiesModule
