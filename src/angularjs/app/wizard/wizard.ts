// tslint:disable:no-require-imports
// tslint:disable:no-import-side-effect
// tslint:disable:no-duplicate-imports
// tslint:disable:newline-before-return
// tslint:disable:curly
import * as angular from 'angular';
import 'angular-touch';
import 'angular-permission';
import modalsModule from '../../common/services/modals/modals';
import { WizardController } from './wizard.controller';
import createProfilePageModule from './create-profile/create-profile';
import consultaionWizardModule from './consultation/consultation';
import summaryWizardModule from './summary/summary';
import { UserService } from '../../common/services/user/user.service';
import { Config } from '../../../config';
import { StateService, StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

const wizardPageModule = angular.module('profitelo.controller.wizard', [
  'permission',
  uiRouter,
  'permission.ui',
  'ngTouch',
  createProfilePageModule,
  modalsModule,
  summaryWizardModule,
  consultaionWizardModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.wizard', {
      abstract: true,
      url: '/wizard',
      controllerAs: 'vm',
      controller: WizardController,
      template: require('./wizard.html'),
      resolve: {
        previousState: ['userService', '$state',
          (userService: UserService, $state: StateService): string | undefined => {
          // tslint:disable-next-line:cyclomatic-complexity
          userService.getUser(true).then((response) => {
            if (!response.hasPassword) $state.go('app.post-register.set-password');
            else if (!response.unverifiedEmail && !response.email) $state.go('app.post-register.set-email');
            else if ((response.isExpert || response.isCompany)) {
              if (Config.isPlatformForExpert) $state.go('app.dashboard.settings.general');
              else $state.go('app.home');
            }
          });
          return $state.current.name;
        }]
      },
      data: {
        permissions: {
          only: ['user'],
          redirectTo: ['$location', ($location: ng.ILocationService): void => {
            $location.path('/login');
          }]
        },
        pageTitle: 'PAGE_TITLE.WIZARDS'
      }
    });
  }])
  .controller('wizardController', WizardController)
  .name;

export default wizardPageModule;
