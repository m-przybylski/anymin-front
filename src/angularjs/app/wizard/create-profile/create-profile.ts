import * as angular from 'angular';
import 'angular-touch';
import 'angular-permission';
import { CreateProfileController } from './create-profile.controller';
import expertWizardModule from './expert/expert';
import companyWizardModule from './company/company';
import wizardStepModule from '../../../common/components/wizard/wizard-step/wizard-step';
import apiModule from 'profitelo-api-ng/api.module';
import tooltipModule from '../../../common/components/interface/tooltip/tooltip';
import { StateService, StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

const createProfilePageModule = angular.module('profitelo.controller.wizard.create-profile', [
  'permission',
  uiRouter,
  'permission.ui',
  expertWizardModule,
  companyWizardModule,
  'ngTouch',
  apiModule,
  wizardStepModule,
  tooltipModule,
  'profitelo.components.interface.preloader'
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.wizard.create-profile', {
      url: '/create-profile',
      controllerAs: 'vm',
      controller: CreateProfileController,
      template: require('./create-profile.html'),
      resolve: {
        previousState: ['$state', ($state: StateService): string | undefined => $state.current.name]
      },
      data: {
        permissions: {
          only: ['user'],
          redirectTo: 'app.login.account'
        },
        pageTitle: 'PAGE_TITLE.WIZARDS.CREATE_PROFILE'
      }
    });
  }])
  .controller('createProfileController', CreateProfileController)
  .name;

export default createProfilePageModule;
