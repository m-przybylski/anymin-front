import * as angular from 'angular'
import {ExpertActivityComponent} from './activity.component';
import './activity.sass'
import modalsModule from '../../../../../services/modals/modals'

export interface IExpertActivityComponentBindings {}

const expertActivityModule = angular.module('profitelo.components.dashboard.expert.activities.expert-activity', [
  'pascalprecht.translate',
  modalsModule
])
  .component('expertActivity', new ExpertActivityComponent())
  .name

export default expertActivityModule
