import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import {CreateProfileController} from './create-profile.controller'
import expertWizardModule from './expert/expert'
import companyWizardModule from './company/company'
import wizardStepModule from '../../../common/components/wizard/wizard-step/wizard-step'
import './create-profile.sass'
import apiModule from 'profitelo-api-ng/api.module'
import tooltipModule from '../../../common/components/interface/tooltip/tooltip'

const createProfilePageModule = angular.module('profitelo.controller.wizard.create-profile', [
  'ui.router',
  'permission',
  'permission.ui',
  expertWizardModule,
  companyWizardModule,
  'ngTouch',
  apiModule,
  wizardStepModule,
  tooltipModule,
  'profitelo.components.interface.preloader'
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.wizard.create-profile', {
    url: '/create-profile',
    controllerAs: 'vm',
    controller: CreateProfileController,
    template: require('./create-profile.pug')(),
    resolve: {
      previousState: ($state: ng.ui.IStateService): string | undefined => $state.current.name
    },
    data: {
      permissions: {
        only: ['user'],
        redirectTo: 'app.login'
      },
      pageTitle: 'PAGE_TITLE.WIZARDS.CREATE_PROFILE'
    }
  })
})
.controller('createProfileController', CreateProfileController)
  .name

export default createProfilePageModule
