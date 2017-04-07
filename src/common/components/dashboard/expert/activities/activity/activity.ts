import * as angular from 'angular'
import {ExpertActivityComponent} from './activity.component';
import './activity.sass'

export interface IExpertActivityComponentBindings {}

const expertActivityModule = angular.module('profitelo.components.dashboard.expert.activities.expert-activity', [
  'pascalprecht.translate'
])
  .component('expertActivity', new ExpertActivityComponent())
  .name

export default expertActivityModule
