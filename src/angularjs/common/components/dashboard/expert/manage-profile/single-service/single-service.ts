import * as angular from 'angular';
import { SingleServiceComponent } from './single-service.component';
import userAvatarModule from '../../../../interface/user-avatar/user-avatar';
import { GetExpertServiceDetails } from 'profitelo-api-ng/model/models';
import userModule from '../../../../../services/user/user';
import modalsModule from '../../../../../services/modals/modals';
import translatorModule from '../../../../../services/translator/translator';

export interface ISingleServiceComponentBindings {
  serviceDetails: GetExpertServiceDetails;
  onModalClose: () => void;
}

const singleServiceModule = angular.module('profitelo.components.dashboard.expert.manage-profile.single-service', [
  'pascalprecht.translate',
  userAvatarModule,
  userModule,
  translatorModule,
  modalsModule
])
  .component('singleService', new SingleServiceComponent())
  .name;

export default singleServiceModule;
