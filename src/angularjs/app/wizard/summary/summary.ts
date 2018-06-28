// tslint:disable:no-import-side-effect
// tslint:disable:no-duplicate-imports
// tslint:disable:newline-before-return
import * as angular from 'angular';
import 'angular-touch';
import 'angular-permission';
import { SummaryController } from './summary.controller';
import { WizardApi } from 'profitelo-api-ng/api/api';
import { GetWizardProfile } from 'profitelo-api-ng/model/models';
import userAvatarModule from '../../../common/components/interface/user-avatar/user-avatar';
import profileHeaderEditModule from '../../../common/components/wizard/summary/profile-header-edit/profile-header-edit';
import singleConsultationEditModule
  from '../../../common/components/wizard/summary/single-consultation-edit/single-consultation-edit';
import apiModule from 'profitelo-api-ng/api.module';
import errorHandlerModule from '../../../common/services/error-handler/error-handler';
import userModule from '../../../common/services/user/user';
import navbarNotificationsModule from '../../../common/components/navbar/navbar-notifications/navbar-notifications';
import { StateProvider, StateService } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';
import topAlertModule from '../../../common/services/top-alert/top-alert';
import commonSettingsModule from '../../../common/services/common-settings/common-settings';

const summaryWizardModule = angular.module('profitelo.controller.wizard.summary', [
  'permission',
  'permission.ui',
  'ngTouch',
  uiRouter,
  userAvatarModule,
  profileHeaderEditModule,
  singleConsultationEditModule,
  apiModule,
  errorHandlerModule,
  navbarNotificationsModule,
  userModule,
  topAlertModule,
  commonSettingsModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.wizard.summary', {
      url: '/summary',
      controllerAs: 'vm',
      controller: SummaryController,
      template: require('./summary.html'),
      resolve: {
        wizardProfile: ['WizardApi', '$state',
          (WizardApi: WizardApi, $state: StateService): ng.IPromise<GetWizardProfile> => {
            const promise = WizardApi.getWizardProfileRoute();
            promise.catch(() => $state.go('app.wizard.create-profile'));
            return promise;
        }]
      },
      data: {
        permissions: {
          only: ['user'],
          redirectTo: ['$location', ($location: ng.ILocationService): void => {
            $location.path('/login');
          }]
        },
        pageTitle: 'PAGE_TITLE.WIZARDS.SUMMARY'
      }
    });
  }])
  .controller('summaryController', SummaryController)
  .name;

export default summaryWizardModule;
