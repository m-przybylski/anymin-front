import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import modalsModule from '../../common/services/modals/modals'
import {WizardController} from './wizard.controller'
import createProfilePageModule from './create-profile/create-profile'
import consultaionWizardModule from './consultation/consultation'
import summaryWizardModule from './summary/summary'

const wizardPageModule = angular.module('profitelo.controller.wizard', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch',
  createProfilePageModule,
  modalsModule,
  summaryWizardModule,
  consultaionWizardModule
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.wizard', {
    abstract: true,
    url: '/wizard',
    controllerAs: 'vm',
    controller: WizardController,
    template: require('./wizard.pug')(),
    resolve: {
      previousState: ($state: ng.ui.IStateService): string | undefined => {
        return $state.current.name
      }
    },
    data: {
      permissions: {
        only: ['user'],
        redirectTo: 'app.login'
      },
      pageTitle: 'PAGE_TITLE.WIZARDS'
    }
  })
})
.controller('wizardController', WizardController)
  .name

export default wizardPageModule
