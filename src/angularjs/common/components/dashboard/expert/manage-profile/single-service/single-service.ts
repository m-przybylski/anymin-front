// tslint:disable:no-mixed-interface
// tslint:disable:prefer-method-signature
import * as angular from 'angular';
import { SingleServiceComponent } from './single-service.component';
import userAvatarModule from '../../../../interface/user-avatar/user-avatar';
import userModule from '../../../../../services/user/user';
import modalsModule from '../../../../../services/modals/modals';
import translatorModule from '../../../../../services/translator/translator';
import { GetService, ServiceWithOwnerProfile } from 'profitelo-api-ng/model/models';

export interface ISingleServiceComponentBindings {
  serviceDetails: ServiceWithOwnerProfile | GetService;
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
