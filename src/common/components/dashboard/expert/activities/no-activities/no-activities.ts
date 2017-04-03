import * as angular from 'angular'
import 'angular-translate'
import {ExpertNoActivitiesComponent} from './no-activities.component'
import noContentMessageModule from '../../../no-content-message/no-content-message';
import './no-activities.sass'

export interface IExpertNoActivitiesComponentBindings extends ng.IController {
}

const expertNoActivitiesModule = angular.module('profitelo.components.dashboard.expert.activities.no-activities', [
  noContentMessageModule,
  'pascalprecht.translate'
])
  .component('expertNoActivities', new ExpertNoActivitiesComponent())
  .name

export default expertNoActivitiesModule
