import * as angular from 'angular'
import {ExpertActivityComponent} from './activity.component';
import './activity.sass'
import modalsModule from '../../../../../services/modals/modals'
import userAvatarModule from '../../../../interface/user-avatar/user-avatar';

export interface IExpertActivityComponentBindings {}

const expertActivityModule = angular.module('profitelo.components.dashboard.expert.activities.expert-activity', [
  'pascalprecht.translate',
  modalsModule,
  userAvatarModule
])
  .component('expertActivity', new ExpertActivityComponent())
  .name

export default expertActivityModule
