import * as angular from 'angular'
import {ExpertActivityComponent} from './activity.component';
import './activity.sass'
import userAvatarModule from '../../../../interface/user-avatar/user-avatar'
import modalsModule from '../../../../../services/modals/modals'
import userModule from '../../../../../services/user/user'

export interface IExpertActivityComponentBindings {}

const expertActivityModule = angular.module('profitelo.components.dashboard.expert.activities.expert-activity', [
  'pascalprecht.translate',
  userAvatarModule,
  modalsModule,
  userModule
])
  .component('expertActivity', new ExpertActivityComponent())
  .name

export default expertActivityModule
