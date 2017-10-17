import * as angular from 'angular'
import {SingleServiceComponent} from './single-service.component'
import userAvatarModule from '../../../../interface/user-avatar/user-avatar'
import './single-service.sass'
import {GetExpertServiceDetails} from 'profitelo-api-ng/model/models';
import userModule from '../../../../../services/user/user'
import modalsModule from '../../../../../services/modals/modals'

export interface ISingleServiceComponentBindings {
  serviceDetails: GetExpertServiceDetails,
  onModalClose: () => void
}

const singleServiceModule = angular.module('profitelo.components.dashboard.expert.manage-profile.single-service', [
  'pascalprecht.translate',
  userAvatarModule,
  userModule,
  modalsModule
])
  .component('singleService', new SingleServiceComponent())
  .name

export default singleServiceModule
